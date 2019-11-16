import { createEvent, createStore } from "effector";

/** Событие запроса следующей страницы */
export const loadNextPage = createEvent<number>('load next page');

/** Смещение в паганации (infinity scroll) */
export const $offset = createStore(10, { name: 'end offset' });
