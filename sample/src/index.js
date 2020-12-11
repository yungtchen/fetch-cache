import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FetchCache from 'fetch-cache';

function getUsers() {
  const url = 'https://reqres.in/api/users?page=2';
  const fc = new FetchCache();
  fc.get(url).then((response) => {
    const users = response.data.map((user) => {
      return {
        first: user.first_name,
        last: user.last_name,
        avatar: user.avatar,
        email: user.email,
      };
    });
    ReactDOM.render(<App users={users} />, document.getElementById('root'));
  });
}

getUsers();
