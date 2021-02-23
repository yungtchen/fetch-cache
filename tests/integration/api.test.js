import FetchCache from '../../src/index';
// using the global isomorphic-fetch for browser and node support
import { fetch } from 'whatwg-fetch';

describe('fetch-cache http methods', () => {
  it('get successfully', async () => {
    const fc = new FetchCache();
    const url = 'https://reqres.in/api/users?page=2';
    const result = await fc.get(url);
    console.log(result);
    expect(result);
  });
  it('post successfully', () => {});
  it('put successfully', () => {});
  it('delete successfully', () => {});
});

describe('fetch-cache cache hits', () => {
  it('get successfully cached', () => {});
});
