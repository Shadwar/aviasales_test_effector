import { $active, $sortedTickets, fxSort, sorted, SortType } from "./index";
import { $filteredTickets } from "../Filters";
import './Sorting.model';
import { NormalizedTicket } from "../NormalizedTicket";

const ticketA: NormalizedTicket = {
   price: [10, '10'],
   carrier: 'Test',
   segments: [
     {
       direction: ['label', 'Value'],
       stops: [0, 'label', 'value'],
       duration: [10, 'label', 'value'],
     },
     {
       direction: ['label', 'Value'],
       stops: [0, 'label', 'value'],
       duration: [10, 'label', 'value'],
     }
   ]
};

const ticketB: NormalizedTicket = {
   price: [20, '20'],
   carrier: 'Test',
   segments: [
     {
       direction: ['label', 'Value'],
       stops: [0, 'label', 'value'],
       duration: [0, 'label', 'value'],
     },
     {
       direction: ['label', 'Value'],
       stops: [0, 'label', 'value'],
       duration: [0, 'label', 'value'],
     }
   ]
};

describe('models/Sorting', () => {
  beforeEach(() => {
    // @ts-ignore
    $filteredTickets.setState([]);
    // @ts-ignore
    $sortedTickets.setState([]);
    // @ts-ignore
    $active.setState(SortType.cheap);
  });

  it('change active on sorted', () => {
    sorted(SortType.fast);
    expect($active.getState()).toBe(SortType.fast);
  });

  it('calls fxSort on $filteredTickets and $active updates', () => {
    const fn = jest.fn();
    fxSort.watch(fn);

    // @ts-ignore
    $filteredTickets.setState([ticketA]);
    expect(fn).toBeCalledTimes(1);

    // @ts-ignore
    $active.setState(SortType.fast);
    expect(fn).toBeCalledTimes(2);
  });

  it('returns sorted tickets on $filteredTickets', async () => {
    const waiter = () => new Promise(resolve => {
      fxSort.done.watch(resolve);
    });

    // @ts-ignore
    $filteredTickets.setState([ticketA, ticketB]);
    await waiter();
    expect($sortedTickets.getState()).toEqual([ticketA, ticketB]);
  });

  it('sorting depends on $active flag', async () => {
    const waiter = () => new Promise(resolve => {
      fxSort.done.watch(resolve);
    });

    // @ts-ignore
    $filteredTickets.setState([ticketA, ticketB]);
    await waiter();

    // @ts-ignore
    $active.setState(SortType.fast);
    await waiter();
    expect($sortedTickets.getState()).toEqual([ticketB, ticketA]);

    // @ts-ignore
    $active.setState(SortType.cheap);
    await waiter();
    expect($sortedTickets.getState()).toEqual([ticketA, ticketB]);
  });
});
