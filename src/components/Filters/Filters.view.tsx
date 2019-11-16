import * as React from 'react';
import { useList } from 'effector-react';
import { $filters } from '../../models/Filters';
import FilterItem from './FilterItem.view';
import styles from './Filters.module.css';

const Filters: React.FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.title}>
      Количество пересадок
    </div>
    {useList($filters, filter => <FilterItem {...filter} />)}
  </div>
);

export default React.memo(Filters);
