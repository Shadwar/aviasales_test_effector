import * as React from 'react';
import ReactDOM from 'react-dom';
import { $searchId, AppGate, fxGetSearchId } from "./index";
import './App.model';

fxGetSearchId.use(() => ({ searchId: '1' }));

describe('models/App', () => {
  beforeEach(() => {
    // @ts-ignore
    $searchId.setState('');
  });

  it('calls fxGetSearchId on AppGate open', () => {
    const fn = jest.fn();
    fxGetSearchId.watch(fn);
    const div = document.createElement('div');
    ReactDOM.render(<AppGate />, div);
    ReactDOM.unmountComponentAtNode(div);
    expect(fn).toBeCalledTimes(1);
  });

  it('fxGetSearchId updates $searchId', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppGate />, div);
    ReactDOM.unmountComponentAtNode(div);
    expect($searchId.getState()).toBe('1');
  });
});
