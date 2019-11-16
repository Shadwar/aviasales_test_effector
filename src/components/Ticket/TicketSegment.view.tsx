import * as React from 'react';
import { NormalizedSegment } from '../../models/NormalizedTicket';
import styles from './Ticket.module.css';


const TicketSegment: React.FC<NormalizedSegment> = ({ direction, stops, duration }) => (
    <div className={styles.segment}>
        <div className={styles.segment_block}>
            <div>{direction[0]}</div>
            <div>{direction[1]}</div>
        </div>
        <div className={styles.segment_block}>
            <div>{duration[1]}</div>
            <div>{duration[2]}</div>
        </div>
        <div className={styles.segment_block}>
            <div>{stops[1]}</div>
            <div>{stops[2]}</div>
        </div>
    </div>
);

export default React.memo(TicketSegment);
