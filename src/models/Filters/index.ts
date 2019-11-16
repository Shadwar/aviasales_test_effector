import { createEvent, createStore, createEffect } from 'effector';
import { NormalizedTicket } from '../NormalizedTicket';

export type Filter = {
    label: string;
    type: number;
};

/** Событие запуска фильтрации */
export const filtered = createEvent<number>('tickets filtered');

/** Список всех фильтров */
export const $filters = createStore<Filter[]>([], { name: 'all filters' });

/** Активные фильтры */
export const $active = createStore<number[]>([-1], { name: 'active filters' });

/** Эффект с процессом фильтрации билетов */
export const fxFiltering = createEffect<[NormalizedTicket[], number[]], NormalizedTicket[]>({ name: 'filtering process' });

/** Отфильтрованные билеты */
export const $filteredTickets = createStore<NormalizedTicket[]>([], { name: 'filtered tickets' });
