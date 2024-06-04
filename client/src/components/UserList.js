import React, { useContext, useEffect, useState } from "react";
import UserCard from "./UserCard";
import { MyContext } from "./MyContext";

function UserList() {

    const { users, deleteUser, updateUser} = useContext(MyContext);

  return (
    <div>
        <h2 className="list-header">Search For Users</h2>
        <ul className="user card-container">{users.map((user) => <UserCard key={user.id} user={user}/>)}</ul>
    </div>
  );
}

export default UserList;