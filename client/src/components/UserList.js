import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

function UserList({users}) {

  return (
    <div>
        <h2 className="full-list-header">Search For Users</h2>
        <ul className="user card-container">{users.map((user) => <UserCard key={user.id} user={user}/>)}</ul>
    </div>
  );
}

export default UserList;