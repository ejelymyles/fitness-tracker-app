import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      fetch("/users")
      .then((r) =>r.json())
      .then((users) => {
        setUsers(users);
      })
    }, [])

  return (
    <div>
        <h1 className="full-list-header">Search For Users</h1>
        <ul className="user card-container">{users.map((user) => <UserCard key={user.id} user={user}/>)}</ul>
    </div>
  );
}

export default UserList;