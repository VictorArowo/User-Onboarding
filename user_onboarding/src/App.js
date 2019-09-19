import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import UserForm from './Components/Form';
import UserList from './Components/UserList';

function App() {
  const [users, setUsers] = useState([]);
  return (
    <div className="App">
      <UserForm setUsers={setUsers} users={users} />
      <UserList users={users} />
    </div>
  );
}

export default App;
