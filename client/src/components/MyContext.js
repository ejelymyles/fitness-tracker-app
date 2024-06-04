import React, { createContext, useState, useEffect } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
    // MANAGE STATE FOR ALL USERS
    const [users, setUsers] = useState([]);
 
    // FETCH DATA FOR ALL USERS
    useEffect(() => {
        fetch("/users")
        .then((r) =>r.json())
        .then((users) => {
          setUsers(users);
        })
      }, [])
    
    // UPDATE STATE TO ADD NEW USER
    function addNewUser(newUser){
      setUsers((prevData) => [...prevData, newUser]);
    }
  
    //  UPDATE STATE TO DELETE USER
    const deleteUser = (userId) => {
      setUsers(users.filter((user) => user.id !== userId));
    };
  
    // UPDATE STATE TO EDIT USER
    const updateUser = (updatedUser) => {
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    };


    // MANAGE STATE FOR ALL EXERCISES
    const [exercises, setExercises] = useState([]);

    // FETCH ALL EXERCISES
    useEffect(() => {
        fetch("/exercises")
        .then((r) =>r.json())
        .then((exercises) => {
          setExercises(exercises);
        })
      }, [])

    // UPDATE STATE TO ADD NEW EXERCISE
    function addNewExercise(newExercise){
        setExercises((prevData) => [...prevData, newExercise]);
    }
    // UPDATE STATE TO DELETE EXERCISE
    const deleteExercise = (exerciseId) => {
        setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
      };
    //   UPDATE STATE TO EDIT EXERCISE 
    const updateExercise = (updatedExercise) => {
        setExercises((prevExercises) => prevExercises.map((exercise) => (exercise.id === updatedExercise.id ? updatedExercise : exercise)));
      };
    
  

  return (
    <MyContext.Provider value={{ users, addNewUser, deleteUser, updateUser, exercises, addNewExercise, deleteExercise, updateExercise}}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
