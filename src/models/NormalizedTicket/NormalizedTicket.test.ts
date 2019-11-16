import { $normalizedTickets, NormalizedTicket } from "./index";
import { $tickets, $ticketsLoaded, Ticket } from "../Tickets";
import { normalize, normalizeSegment } from "./utils";
import './NormalizedTicket.model';

const ticket: Ticket = {
  price: 10,
  carrier: 'Test',
  segments: [
    { origin: 'A', destination: 'B', stops: [], duration: 60, date: '2019-01-01T10:00:00.000Z' },
    { origin: 'B', destination: 'A', stops: [], duration: 60, date: '2019-01-02T10:00:00.000Z' },
  ]
};

const normalizedTicket: NormalizedTicket = {
   price: [10, '10 P'],
   carrier: 'Test',
   segments: [
     {
       direction: ['A - B', '13:00 - 14:00'],
       duration: [60, 'В пути', '1ч'],
       stops: [0, 'Без пересадок', ''],
     },
     {
       direction: ['B - A', '13:00 - 14:00'],
       duration: [60, 'В пути', '1ч'],
       stops: [0, 'Без пересадок', ''],
     }
   ]
};

describe('models/NormalizedTicket', () => {
  beforeEach(() => {
    // @ts-ignore
    $ticketsLoaded.setState(false);
    // @ts-ignore
    $tickets.setState([ticket]);
    // @ts-ignore
    $normalizedTickets.setState([]);
  });

  it('update $normalizedTickets on $tickets update if $ticketsLoaded', () => {
    // @ts-ignore
    $ticketsLoaded.setState(true);

    expect($normalizedTickets.getState()).toEqual([normalizedTicket]);
  });

  describe('normalize', () => {
    it('normalize ticket', () => {
      expect(normalize([ticket])).toEqual([normalizedTicket]);
    });

    it('normalize segment', () => {
      expect(normalizeSegment(ticket.segments[0])).toEqual(normalizedTicket.segments[0]);
    });
  });
});
