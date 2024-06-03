import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogList from "./LogList";
import NewLogForm from "./NewLogForm";

function WorkoutDetails() {
  const [workout, setWorkout] = useState(null);
  const [logs, setLogs] = useState([]);
  const { user_id, workout_id } = useParams();

  // fetch the users specific workout to dislay on the workout details page
  useEffect(() => {
    fetch(`/users/${user_id}/workouts/${workout_id}`)
      .then((r) => r.json())
      .then((workout) => {
        setWorkout(workout);
      });
  }, [user_id, workout_id]);

  //fetch the workouts log informtation to pass to loglist
  useEffect(() => {
    fetch(`/users/${user_id}/workouts/${workout_id}/logs`)
      .then((r) => r.json())
      .then((logs) => {
        setLogs(logs);
      });
  }, [user_id, workout_id]);

   // build function to update state and pass it to the newLog form
   function addNewLog(newLog){
    setLogs((prevData) => [...prevData, newLog]);
  }

  const deleteLog = (logId) => {
    setLogs(logs.filter((log) => log.id !== logId));
  };

  const updateLog = (updatedLog) => {
    setLogs((prevLogs) => prevLogs.map((log) => (log.id === updatedLog.id ? updatedLog : log)));
  };




  if (!workout) {
    return <div>Loading...</div>;
  }

  const { date, duration } = workout;



  return (
    <div>
      <div className="details-page">
        <h2 className="full-list-header">Workout Details</h2>
        <p>Date: {date}</p>
        <p>Duration {duration} minutes</p>
      </div>
      <hr />
      <div>
        <LogList logs={logs} onDelete={deleteLog} onUpdate={updateLog}/>
      </div>
      <hr />
      <div>
        <NewLogForm addNewLog={addNewLog}/>
      </div>
    </div>
  );
}

export default WorkoutDetails;
