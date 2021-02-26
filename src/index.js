import 'whatwg-fetch';

const DEFAULT_TTL = 4000;
const DEFAULT_OPTIONS = {
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
};

function apiDelegate(url, method, data, userOptions = {}) {
  const baseOptions = { method };
  if (data) {
    baseOptions.body = JSON.stringify(data);
  }
  const payload = Object.assign(DEFAULT_OPTIONS, userOptions, baseOptions);
  return fetch(url, payload).then((response) => response.json());
}

function isExpired(timestamp, expectedTtl) {
  return Date.now() - timestamp > expectedTtl;
}
export default class FetchCache {
  constructor(options = {}) {
    this.ttl = options.ttl || DEFAULT_TTL;
    this.cache = {};
  }

  get(url, userOptions) {
    const defaultOptions = {};
    const baseOptions = Object.assign(defaultOptions, userOptions);
    const cacheHit = this.cache[url];
    if (cacheHit && !isExpired(cacheHit.timestamp, this.ttl)) {
      return cacheHit.data;
    }

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const timestamp = Date.now();
        this.cache[url] = { timestamp, data };
        return data;
      });
  }

  async put(url, data) {
    return apiDelegate(url, 'PUT', data);
  }

  async put(url, data) {
    return apiDelegate(url, 'PATCH', data);
  }

  async post(url, data, userOptions) {
    return apiDelegate(url, 'POST', data, userOptions);
  }

  async delete(url, data, userOptions) {
    return fetch(url).then((response) => response.statusText);
  }
}
