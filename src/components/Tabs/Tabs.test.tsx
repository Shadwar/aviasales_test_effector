import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from './Tabs.view';
import TabItem from './TabItem.view';

describe('components/Tabs', () => {
  describe('Tabs', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Tabs />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  describe('TabItem', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<TabItem label="Test" type={1} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
