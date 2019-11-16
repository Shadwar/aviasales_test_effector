import { NormalizedTicket } from "../NormalizedTicket";

/** Сортировка билетов по цене */
export const sortByPrice = (ticketA: NormalizedTicket, ticketB: NormalizedTicket): number =>
  ticketA.price[0] - ticketB.price[0];

/** Сортировка билетов по длительности */
export const sortByDuration = (ticketA: NormalizedTicket, ticketB: NormalizedTicket): number => {
    const [outgoingA, incomingA] = ticketA.segments;
    const [outgoingB, incomingB] = ticketB.segments;

    return (outgoingA.duration[0] + incomingA.duration[0]) - (outgoingB.duration[0] + incomingB.duration[0]);
};
