import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogList from "./LogList";
import NewLogForm from "./NewLogForm";

function WorkoutDetails() {
  const [workout, setWorkout] = useState(null);
  const { user_id, workout_id } = useParams();

  useEffect(() => {
    fetch(`/users/${user_id}/workouts/${workout_id}`)
      .then((r) => r.json())
      .then((workout) => {
        setWorkout(workout);
      });
  }, [user_id, workout_id]);


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
        <LogList />
      </div>
      <hr />
      <div>
        <NewLogForm />
      </div>
    </div>
  );
}

export default WorkoutDetails;
