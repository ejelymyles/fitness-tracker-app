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
    

      //MANAGE STATE FOR WORKOUTS
    const [workouts, setWorkouts] = useState([]);

      // UPDATE STATE TO ADD NEW WORKOUT
    function addNewWorkout(newWorkout){
        setWorkouts((prevData) => [...prevData, newWorkout]);
    }

//   UPDATE STATE TO DELETE WORKOUT
    const deleteWorkout = (workoutId) => {
        setWorkouts(workouts.filter((workout) => workout.id !== workoutId));
    };

//   UPDATE STATE TO EDIT WORKOUT
    const updateWorkout = (updatedWorkout) => {
        setWorkouts((prevWorkout) => prevWorkout.map((workout) => (workout.id === updatedWorkout.id ? updatedWorkout : workout)));
    };


//  MANAGE STATE FOR LOGS
    const [logs, setLogs] = useState([]);


    // UPDATE STATE AND TO ADD NEW LOG
   function addNewLog(newLog){
    setLogs((prevData) => [...prevData, newLog]);
  }

  // UPDATE STATE TO DELETE LOG
  const deleteLog = (logId) => {
    setLogs(logs.filter((log) => log.id !== logId));
  };

  // UPDATE STATE TO EDIT LOG 
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
