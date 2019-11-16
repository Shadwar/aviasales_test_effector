import * as React from 'react';
import styles from './Logo.module.css';

const Logo: React.FC = () => (
    <div className={styles.wrapper} />
);

export default React.memo(Logo);
