import * as React from 'react';
import { SortType } from '../../models/Sorting';
import styles from './Tabs.module.css';
import TabItem from './TabItem.view';

const Tabs: React.FC = () => (
    <div className={styles.wrapper}>
        <TabItem label="Самый дешевый" type={SortType.cheap} />
        <TabItem label="Самый быстрый" type={SortType.fast} />
    </div>
);

export default React.memo(Tabs);
