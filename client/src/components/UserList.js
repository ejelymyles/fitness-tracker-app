import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

function UserList({users, onDelete}) {

  return (
    <div>
        <h2 className="full-list-header">Search For Users</h2>
        <ul className="user card-container">{users.map((user) => <UserCard key={user.id} user={user} onDelete={onDelete}/>)}</ul>
    </div>
  );
}

export default UserList;