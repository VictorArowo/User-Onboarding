import React from 'react';

const UserList = ({ users }) => {
  return users.map(user => (
    <div key={user.id}>
      {user.name} - {user.email} is a {user.role}
    </div>
  ));
};

export default UserList;
