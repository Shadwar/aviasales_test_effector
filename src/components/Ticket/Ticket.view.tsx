import * as React from 'react';
import { NormalizedTicket as Props } from '../../models/NormalizedTicket';
import TicketSegment from './TicketSegment.view';
import styles from './Ticket.module.css';


const Ticket: React.FC<Props> = ({ price, carrier, segments }) => (
    <div className={styles.ticket}>
        <div className={styles.title}>
            <div className={styles.price}>
                {price[1]}
            </div>
            <div className={styles.carrier}>
                {carrier}
            </div>
        </div>
        <TicketSegment {...segments[0]} />
        <TicketSegment {...segments[1]} />
    </div>
);

export default React.memo(Ticket);
