import { createEffect, createStore } from 'effector';

export type Segment = {
    origin: string;
    destination: string;
    date: string;
    stops: string[];
    duration: number;
};

export type Ticket = {
    price: number;
    carrier: string;
    segments: [Segment, Segment];
};

/** Все билеты в сыром виде */
export const $tickets = createStore<Ticket[]>([], { name: 'tickets' });

/** Флаг, что билеты были загружены */
export const $ticketsLoaded = createStore(false, { name: 'tickets loaded' });

/** Эффект для загрузки билетов */
export const fxLoadTickets = createEffect<string, { tickets: Ticket[], stop: boolean }>({ name: 'load tickets' });
