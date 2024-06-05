import React, { useContext } from "react";
import WorkoutCard from "./WorkoutCard";
import { MyContext } from "./MyContext";

function WorkoutList() {
    const {workouts} = useContext(MyContext);

  return (
    <div>
        <h2 className="list-header">Logged Workouts</h2>
        <ul className="workout card-container">{workouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}</ul>
    </div>
  );
}
export default WorkoutList;