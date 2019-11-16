import * as React from 'react';
import { createComponent } from 'effector-react';
import { Filter, filtered, $active } from '../../models/Filters';
import styles from './Filters.module.css';


const FilterItem = createComponent<Filter, any>($active, ({ label, type }, activeFilters) => {
  const clicked = React.useCallback(() => filtered(type), [type]);

  return (
    <>
      <label className={styles.label}>
        <input
          type="checkbox"
          name={label}
          value={type}
          onClick={clicked}
          checked={activeFilters.indexOf(type) !== -1}
          readOnly
          className={styles.checkbox}
        />
        {label}
      </label>
    </>
  );
});

export default React.memo(FilterItem);
