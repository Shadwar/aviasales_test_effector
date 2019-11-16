import React from 'react';
import { AppGate } from './models/App';
import styles from './App.module.css';
import Logo from './components/Logo/Logo.view';
import Content from './components/Content/Content.view';

const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <AppGate />
      <Logo />
      <Content />
    </div>
  );
};

export default App;
