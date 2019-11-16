import { createStore } from 'effector';

export type NormalizedSegment = {
    direction: [string, string];
    stops: [number, string, string];
    duration: [number, string, string];
}

export type NormalizedTicket = {
    price: [number, string];
    carrier: string;
    segments: [NormalizedSegment, NormalizedSegment];
};

/** Список нормализованных билетов для отображения */
export const $normalizedTickets = createStore<NormalizedTicket[]>([], { name: 'normalized tickets' });
