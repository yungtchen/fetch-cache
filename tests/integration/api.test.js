import FetchCache from '../../src/index';
// using the global isomorphic-fetch for browser and node support
import { fetch } from 'whatwg-fetch';

describe('fetch-cache http methods', () => {
  it('get successfully', async () => {
    const fc = new FetchCache();
    const url = 'https://reqres.in/api/users?page=2';
    const resp = await fc.get(url);
    const expectedUser = {
      id: 7,
      email: 'michael.lawson@reqres.in',
      first_name: 'Michael',
      last_name: 'Lawson',
      avatar: 'https://reqres.in/img/faces/7-image.jpg',
    };
    expect(resp.total).toEqual(12);
    expect(resp.data[0]).toEqual(expectedUser);
  });

  it('post successfully', async () => {
    const fc = new FetchCache();
    const url = 'https://reqres.in/api/users';
    const payload = {
      name: 'morpheus',
      job: 'leader',
    };
    const resp = await fc.post(url, payload);
    expect(resp.name).toEqual(payload.name);
    expect(resp.job).toEqual(payload.job);
    expect(resp.createdAt).toBeDefined();
    expect(resp.id).toBeDefined();
  });

  it('put successfully', async () => {
    const fc = new FetchCache();
    const url = 'https://reqres.in/api/users/2';
    const payload = {
      name: 'morpheus',
      job: 'zion resident',
    };
    const resp = await fc.put(url, payload);
    expect(resp.name).toEqual(payload.name);
    expect(resp.job).toEqual(payload.job);
    expect(resp.updatedAt).toBeDefined();
  });
  it('delete successfully', async () => {
    const fc = new FetchCache();
    const url = 'https://reqres.in/api/users/2';
    const resp = await fc.delete(url);
    expect(resp).toEqual('OK');
  });
});

describe('fetch-cache cache hits', () => {
  it('get successfully cached', () => {});
});
