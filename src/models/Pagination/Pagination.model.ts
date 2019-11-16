import { $offset, loadNextPage } from './index';
import { $sortedTickets } from "../Sorting";

$offset
  .on(loadNextPage, state => state + 10)
  .reset($sortedTickets.updates);
