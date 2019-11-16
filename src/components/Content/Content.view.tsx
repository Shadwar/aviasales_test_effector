import * as React from 'react';
import { useStore } from 'effector-react';
import InfiniteScroll from 'react-infinite-scroller';
import Filters from '../Filters/Filters.view';
import Tabs from '../Tabs/Tabs.view';
import Ticket from '../Ticket/Ticket.view';
import { $sortedTickets } from "../../models/Sorting";
import { $offset, loadNextPage } from "../../models/Pagination";
import styles from './Content.module.css';


const Content: React.FC = () => {
  const tickets = useStore($sortedTickets);
  const offset = useStore($offset);

  return (
    <div className={styles.wrapper}>
      <Filters />
      <div className={styles.content}>
        <Tabs />
        <div className={styles.tickets}>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadNextPage}
            hasMore={offset < tickets.length}
          >
            {tickets.slice(0, offset).map(ticket => <Ticket {...ticket} />)}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Content);
