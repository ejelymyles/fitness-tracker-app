import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogList from "./LogList";
import NewLogForm from "./NewLogForm";
import { MyContext } from "./MyContext";

function WorkoutDetails() {
  const [workout, setWorkout] = useState(null);
//   const [logs, setLogs] = useState([]);
  const { user_id, workout_id } = useParams();

  const{ logs, setLogs, addNewLog, deleteLog, updateLog} = useContext(MyContext);


  // fetch the users specific workout to dislay on this component
  useEffect(() => {
    fetch(`/users/${user_id}/workouts/${workout_id}`)
      .then((r) => r.json())
      .then((workout) => {
        setWorkout(workout);
      });
  }, [user_id, workout_id]);

  //fetch the workouts log informtation to pass to loglist component
  useEffect(() => {
    fetch(`/users/${user_id}/workouts/${workout_id}/logs`)
      .then((r) => r.json())
      .then((logs) => {
        setLogs(logs);
      });
  }, [user_id, workout_id], setLogs);


//    // UPDATE STATE AND TO ADD NEW LOG
//    function addNewLog(newLog){
//     setLogs((prevData) => [...prevData, newLog]);
//   }

//   // UPDATE STATE TO DELETE LOG
//   const deleteLog = (logId) => {
//     setLogs(logs.filter((log) => log.id !== logId));
//   };

//   // UPDATE STATE TO EDIT LOG 
//   const updateLog = (updatedLog) => {
//     setLogs((prevLogs) => prevLogs.map((log) => (log.id === updatedLog.id ? updatedLog : log)));
//   };




  if (!workout) {
    return <div>Loading...</div>;
  }

  const { date, duration } = workout;



  return (
    <div>
      <div className="workout details-page">
        <h2 className="list-header">Workout Details</h2>
        <p>Date: {date}</p>
        <p>Duration {duration} minutes</p>
      </div>
      <hr className="breakline"/>
      <div>
        <LogList />
      </div>
      <hr className="breakline"/>
      <div>
        <NewLogForm />
      </div>
    </div>
  );
}

export default WorkoutDetails;
