import React, { createContext, useState, useEffect } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  
  //MANAGE STATE FOR USERS, EXERCISES, WORKOUTS, AND LOGS
  const [users, setUsers] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [logs, setLogs] = useState([]);
 
    // FETCH DATA FOR ALL USERS
    useEffect(() => {
        fetch("/users")
        .then((r) =>r.json())
        .then((users) => {
          setUsers(users);
        })
      }, [])
    
      // FETCH ALL EXERCISES
    useEffect(() => {
        fetch("/exercises")
        .then((r) =>r.json())
        .then((exercises) => {
          setExercises(exercises);
        })
      }, [])


    // UPDATE STATE WHEN USERS ADDED, EDITED, OR DELETED
    function addNewUser(newUser){
      setUsers((prevData) => [...prevData, newUser]);
    };
  
    const deleteUser = (userId) => {
      setUsers(users.filter((user) => user.id !== userId));
    };
  
    const updateUser = (updatedUser) => {
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    };



    // UPDATE STATE WHEN EXERCISES ADDED, EDITED, OR DELETED
    function addNewExercise(newExercise){
        setExercises((prevData) => [...prevData, newExercise]);
    };
    
    const deleteExercise = (exerciseId) => {
        setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
      };
    
    const updateExercise = (updatedExercise) => {
        setExercises((prevExercises) => prevExercises.map((exercise) => (exercise.id === updatedExercise.id ? updatedExercise : exercise)));
      };
    


    // UPDATE STATE WHEN WORKOUTS ADDED, EDITED, OR DELETED
    function addNewWorkout(newWorkout){
        setWorkouts((prevData) => [...prevData, newWorkout]);
    }

    const deleteWorkout = (workoutId) => {
        setWorkouts(workouts.filter((workout) => workout.id !== workoutId));
    };

    const updateWorkout = (updatedWorkout) => {
        setWorkouts((prevWorkout) => prevWorkout.map((workout) => (workout.id === updatedWorkout.id ? updatedWorkout : workout)));
    };


    // UPDATE STATE WHEN LOGS ADDED, EDITED, OR DELETED
   function addNewLog(newLog){
    setLogs((prevData) => [...prevData, newLog]);
  }


  const deleteLog = (logId) => {
    setLogs(logs.filter((log) => log.id !== logId));
  };

  const updateLog = (updatedLog) => {
    setLogs((prevLogs) => prevLogs.map((log) => (log.id === updatedLog.id ? updatedLog : log)));
  };
  

  return (
    <MyContext.Provider value={{ 
        users,
        setUsers, 
        addNewUser, 
        deleteUser, 
        updateUser, 
        exercises, 
        setExercises,
        addNewExercise, 
        deleteExercise, 
        updateExercise, 
        workouts, 
        setWorkouts, 
        addNewWorkout, 
        deleteWorkout, 
        updateWorkout,
        logs,
        setLogs,
        addNewLog,
        deleteLog,
        updateLog,
        }}>
      {children}
    </MyContext.Provider>
  );
};
export { MyContext, MyProvider };
