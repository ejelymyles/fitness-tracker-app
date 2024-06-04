import React, { createContext, useState, useEffect } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/users")
        .then((r) =>r.json())
        .then((users) => {
          setUsers(users);
        })
      }, [])
  
    function addNewUser(newUser){
      setUsers((prevData) => [...prevData, newUser]);
    }
  
    const deleteUser = (userId) => {
      setUsers(users.filter((user) => user.id !== userId));
    };
  
    const updateUser = (updatedUser) => {
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    };
  

  return (
    <MyContext.Provider value={{ users, addNewUser, deleteUser, updateUser  }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
