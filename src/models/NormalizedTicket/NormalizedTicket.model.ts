import { $normalizedTickets } from './index';
import { $tickets, $ticketsLoaded } from '../Tickets';
import { normalize } from './utils';
import { guard, sample } from 'effector';

/** После загрузки всех билетов сделать их нормализацию (подготовить для отображения) */
sample({
    source: $tickets,
    clock: guard($ticketsLoaded, { filter: loaded => loaded }),
    target: $normalizedTickets,
    fn: tickets => normalize(tickets),
});
