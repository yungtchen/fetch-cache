import FetchCache from '../../src/index.js';

const url = 'https://reqres.in/api/users?page=2';
const fc = new FetchCache();
fc.get(url).then((data) => {
  console.log(data);
});
// fetch(url)
//   .then((res) => res.json())
//   .then((data) => console.log(data));
