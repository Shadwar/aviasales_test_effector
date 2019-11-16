import { sample, merge, combine } from 'effector';
import { filtered, fxFiltering, $filteredTickets, $filters, $active } from './index';
import { $normalizedTickets, NormalizedTicket } from '../NormalizedTicket';
import { getFilterLabel } from "./utils";

$active
    .on(filtered, (state, type) => state.indexOf(type) !== -1 ? state.filter(item => item !== type) : [...state, type]);

$filteredTickets
    .on(fxFiltering.done, (_, { result }) => result);

$filters
  .on($normalizedTickets.updates, (_, tickets) => {
     const filters = [-1];
     tickets.forEach(ticket => {
         const [outgoing, incoming] = ticket.segments;
         filters.push(Math.max(outgoing.stops[0], incoming.stops[0]));
     });

     return Array.from(new Set(filters)).sort().map(n => ({ label: getFilterLabel(n), type: n }))
  });

/** Фильтрация билетов по количеству пересадок */
fxFiltering.use(([tickets, active]) => {
    const filterFn = (ticket: NormalizedTicket): boolean => {
        if (active.indexOf(-1) !== -1) return true;
        const [outgoing, incoming] = ticket.segments;
        const stops = Math.max(outgoing.stops[0], incoming.stops[0]);

        return active.indexOf(stops) !== -1;
    };

    return tickets.filter(filterFn);
});

/** После изменения нормализованных билетов или активных фильров запустить процесс фильтрации */
sample({
    source: combine([$normalizedTickets, $active]),
    clock: merge([$normalizedTickets.updates, $active.updates]),
    target: fxFiltering,
});
