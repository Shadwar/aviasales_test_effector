import { forward } from 'effector';
import { fxGetSearchId, AppGate, $searchId } from './index';

$searchId
  .on(fxGetSearchId.done, (_, { result }) => result.searchId);

/** Запрос searchId с сервера */
fxGetSearchId.use(async () => {
    const response = await fetch('https://front-test.beta.aviasales.ru/search');
    return await response.json();
});

/** При открытии гейта сделать запрос за searchId */
forward({
    from: AppGate.open,
    to: fxGetSearchId,
});
