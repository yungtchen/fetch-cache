import './App.css';

function App(props) {
  const { users } = props;
  const rows = users.map((user) => {
    return (
      <tr>
        <td>
          <img src={user.avatar} alt="avatar" />
          <div>
            {user.first} {user.last}
          </div>
        </td>
        <td>{user.email}</td>
      </tr>
    );
  });
  return (
    <table>
      <th>User</th>
      <th>Email</th>
      {rows}
    </table>
  );
}

export default App;
