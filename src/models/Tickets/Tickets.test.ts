import { $tickets, $ticketsLoaded, fxLoadTickets, Ticket } from "./index";
import { $searchId } from "../App";
import './Tickets.model';

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

const ticket: Ticket = {
  price: 10,
  carrier: 'Test',
  segments: [
    { origin: 'A', destination: 'B', stops: [], duration: 60, date: '2019-01-01T10:00:00.000Z' },
    { origin: 'B', destination: 'A', stops: [], duration: 60, date: '2019-01-02T10:00:00.000Z' },
  ]
};

fxLoadTickets.use(() => ({ tickets: [ticket], stop: true }));

describe('models/Tickets', () => {
  beforeEach(() => {
    // @ts-ignore
    $searchId.setState('');

    // @ts-ignore
    $tickets.setState([]);

    // @ts-ignore
    $ticketsLoaded.setState(false);
  });

  it('call fxLoadTickets on $searchId update', () => {
    const fn = jest.fn();
    fxLoadTickets.watch(fn);

    // @ts-ignore
    $searchId.setState('1');
    expect(fn).toBeCalledTimes(1);
  });

  it('update tickets after fxLoadTickets done', async () => {
    // @ts-ignore
    $searchId.setState('1');
    await sleep(100);

    expect($tickets.getState()).toEqual([ticket]);
  });

  it('set $ticketsLoaded after load all tickets', async () => {
    expect($ticketsLoaded.getState()).toBe(false);
    fxLoadTickets('');
    await sleep(100);

    expect($ticketsLoaded.getState()).toBe(true);
  })
});
