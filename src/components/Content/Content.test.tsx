import * as React from 'react';
import ReactDOM from 'react-dom';
import Content from './Content.view';

describe('components/Content', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Content />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
