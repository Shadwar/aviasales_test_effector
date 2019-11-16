import { $offset, loadNextPage } from './index';
import './Pagination.model';

describe('models/Pagination', () => {
  beforeEach(() => {
    // @ts-ignore
    $offset.setState(0);
  });

  it('increase $offset on loadNextPage', () => {
    loadNextPage(0);
    expect($offset.getState()).toBe(10);
  });
});
