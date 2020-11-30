const DEFAULT_TTL = 2000;
export default class FetchCache {
  constructor(options = {}) {
    this.ttl = options.ttl || DEFAULT_TTL;
    this.cache = {};
  }

  get(url, userOptions) {
    const defaultOptions = {};
    const options = Object.assign(defaultOptions, userOptions);
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

  async put(url, data) {}

  async post(url, data) {}
}
