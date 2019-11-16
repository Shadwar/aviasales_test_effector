import { filtered, $filters, $filteredTickets, $active, fxFiltering } from "./index";
import { $normalizedTickets, NormalizedTicket } from "../NormalizedTicket";
import { getFilterLabel } from "./utils";
import './Filters.model';

const ticket: NormalizedTicket = {
   price: [10, '10'],
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

const tickets = [ticket];

fxFiltering.use(() => tickets);


describe('models/Filters', () => {
  beforeEach(() => {
    // @ts-ignore
    $normalizedTickets.setState([]);
    // @ts-ignore
    $filters.setState([]);
    // @ts-ignore
    $active.setState([]);
    // @ts-ignore
    $filteredTickets.setState([]);
  });

  it('change actives on filtered', () => {
    filtered(1);
    expect($active.getState()).toEqual([1]);
  });

  it('call fxFiltering on $normalizedTicket or $active change', () => {
    const fn = jest.fn();
    fxFiltering.watch(fn);
    // @ts-ignore
    $normalizedTickets.setState(tickets);
    expect(fn).toBeCalledTimes(1);

    // @ts-ignore
    $active.setState([-1]);
    expect(fn).toBeCalledTimes(2);
  });

  it('change filteredTickets on fxFiltering.done', () => {
    // @ts-ignore
    $normalizedTickets.setState(tickets);
    fxFiltering([$normalizedTickets.getState(), $active.getState()]);
    expect($filteredTickets.getState()).toEqual(tickets);
  });

  it('creates $filters array with normalized data', () => {
    expect($filters.getState()).toEqual([]);

    // @ts-ignore
    $normalizedTickets.setState(tickets);

    expect($filters.getState()).toEqual([
      { label: getFilterLabel(-1), type: -1 },
      { label: getFilterLabel(0), type: 0 },
    ]);
  });

  describe('getFilterLabel', () => {
    it('returns label by type', () => {
      expect(getFilterLabel(-1)).toBe('Все');
      expect(getFilterLabel(0)).toBe('Без пересадок');
      expect(getFilterLabel(1)).toBe('1 пересадка');
      expect(getFilterLabel(2)).toBe('2 пересадки');
      expect(getFilterLabel(5)).toBe('5 пересадок');
    });
  });
});
