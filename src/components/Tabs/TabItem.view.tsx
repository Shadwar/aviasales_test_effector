import * as React from 'react';
import { createComponent } from 'effector-react';
import styles from './Tabs.module.css';
import { Sort, sorted, $active, SortType } from '../../models/Sorting';

const TabItem = createComponent<Sort, SortType>($active, ({ label, type }, activeTab) => {
    const clicked = React.useCallback(() => sorted(type), [type]);

    return (
        <div className={styles.item} data-active={activeTab === type} onClick={clicked}>
            {label}
        </div>
    );
});

export default React.memo(TabItem);
