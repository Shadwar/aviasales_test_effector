import { createEvent, createEffect, createStore } from 'effector';
import { NormalizedTicket } from '../NormalizedTicket';

export enum SortType { cheap, fast }

export type Sort = {
    label: string;
    type: SortType;
};

/** Событие сортировки */
export const sorted = createEvent<SortType>('tickets sorted');

/** Активная сортировка */
export const $active = createStore<SortType>(SortType.cheap, { name: 'active sorting' });

/** Эффект сортировки */
export const fxSort = createEffect<[NormalizedTicket[], SortType], NormalizedTicket[]>({ name: 'sorting process' });

/** Отсортированные билеты */
export const $sortedTickets = createStore<NormalizedTicket[]>([], { name: 'sorted tickets' });
