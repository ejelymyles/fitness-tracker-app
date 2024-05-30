import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WorkoutCard from "./WorkoutCard";

function WorkoutList({ workouts }) {
//   const [workouts, setWorkouts] = useState([]);
//   const { id } = useParams();

//   useEffect(() => {
//       fetch(`/users/${id}/workouts`)
//       .then((r) =>r.json())
//       .then((workouts) => {
//         setWorkouts(workouts);
//       })
//     }, [id])

  return (
    <div>
        <h2 className="full-list-header">Logged Workouts</h2>
        <ul className="workout card-container">{workouts.map((workout) => <WorkoutCard key={workout.id} workout={workout}/>)}</ul>
    </div>
  );
}

export default WorkoutList;