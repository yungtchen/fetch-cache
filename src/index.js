const DEFAULT_TTL = 2000;
const DEFAULT_OPTIONS = {
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
};
export default class FetchCache {
  constructor(options = {}) {
    this.ttl = options.ttl || DEFAULT_TTL;
    this.cache = {};
  }

  get(url, userOptions) {
    const defaultOptions = {};
    const baseOptions = Object.assign(defaultOptions, userOptions);
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!this.cache[url] || Date.now() - this.cache[url].ttl > this.ttl) {
          const ttl = Date.now() + this.ttl;
          this.cache[url] = { ttl, data };
          return data;
        } else {
          return this.cache[url].data;
        }
      });
  }

  apiDelegate(method, data, userOptions = {}) {
    const baseOptions = { method };
    if(data) {
      baseOptions.body = JSON.stringify(data);
    }
    const payload = Object.assign(DEFAULT_OPTIONS, userOptions, baseOptions);
    return fetch(url, payload).then((response) => response.json());
  }

  async put(url, data) {
    return apiDelegate('PUT', data);
  }

  post(url, data, userOptions) {
    return apiDelegate('POST', data, userOptions);
  }
}
