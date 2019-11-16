import { createEffect, createStore } from 'effector';
import { createGate } from "effector-react";

/** Гейт для отслеживания mount/unmount приложения */
export const AppGate = createGate('app gate');

/** Эффект для запроса searchId */
export const fxGetSearchId = createEffect<any, {searchId: string}>({ name: 'get search id' });

/** Текущий searchId */
export const $searchId = createStore<string>('', { name: 'search id' });
