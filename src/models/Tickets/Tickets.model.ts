import { sample, forward, merge } from 'effector';
import { $tickets, fxLoadTickets, $ticketsLoaded } from './index';
import { $searchId } from '../App';

$tickets
    .on(fxLoadTickets.done, (state, { result }) => [...state, ...result.tickets]);

$ticketsLoaded
  .on(fxLoadTickets, () => false)
  .on(fxLoadTickets.done.filter({ fn: ({ result }) => result.stop }), () => true);


/** Загрузка билетов с сервера используя searchId */
fxLoadTickets.use(async searchId => {
    const response = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
    return await response.json();
});

/** После получения searchId запустить загрузку билетов */
forward({
    from: $searchId.updates,
    to: fxLoadTickets,
});

/** При ошибке или если есть еще билеты сделать новый запрос */
sample({
    source: fxLoadTickets,
    clock: merge([fxLoadTickets.done.filter({ fn: ({ result }) => !result.stop }), fxLoadTickets.fail]),
    target: fxLoadTickets,
});
