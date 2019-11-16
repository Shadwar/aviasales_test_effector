import React from 'react';
import ReactDOM from 'react-dom';
import Filters from './Filters.view';
import FilterItem from './FilterItem.view';

describe('components/Filters', () => {
  describe('Filters', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Filters />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  describe('FilterItem', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<FilterItem label="Test" type={1} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
