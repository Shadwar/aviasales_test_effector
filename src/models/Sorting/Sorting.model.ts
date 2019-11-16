import { combine, merge, sample } from 'effector';
import { $active, $sortedTickets, fxSort, sorted, SortType } from './index';
import { $filteredTickets } from '../Filters';
import { sortByDuration, sortByPrice } from './utils';

$active.on(sorted, (_, type) => type);

$sortedTickets
    .on(fxSort, () => [])
    .on(fxSort.done, (_, { result }) => result);

/** Сортировка списка билетов в зависимости от активной сортировки */
fxSort.use(async ([tickets, active]) => {
    const sortFn = active === SortType.cheap ? sortByPrice : sortByDuration;
    return tickets.sort(sortFn);
});

/** Отсортировать билеты при изменении фильтрованных билетов или активной сортировки */
sample({
    source: combine([$filteredTickets, $active]),
    clock: merge([$filteredTickets.updates, $active.updates]),
    target: fxSort,
});
