import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogList from "./LogList";
import NewLogForm from "./NewLogForm";
import { MyContext } from "./MyContext";

function WorkoutDetails() {
  const [workout, setWorkout] = useState(null);
  const { user_id, workout_id } = useParams();

  const{ setLogs } = useContext(MyContext);


  
  useEffect(() => {
    fetch(`/users/${user_id}/workouts/${workout_id}`)
      .then((r) => r.json())
      .then((workout) => {
        setWorkout(workout);
      });
  }, [user_id, workout_id]);

  
  useEffect(() => {
    fetch(`/users/${user_id}/workouts/${workout_id}/logs`)
      .then((r) => r.json())
      .then((logs) => {
        setLogs(logs);
      });
  }, [user_id, workout_id], setLogs);

  if (!workout) {
    return <div>Loading...</div>;
  }

  const { date, duration } = workout;



  return (
    <div>
      <div className="workout details-page">
        <h2 className="list-header">Workout Details</h2>
        <p className="workout-detail-text">Date: <span className="value">{date}</span> </p>
        <p className="workout-detail-text">Duration: <span className="value">{duration} minutes</span> </p>
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
