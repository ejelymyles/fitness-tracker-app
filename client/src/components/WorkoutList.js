import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WorkoutCard from "./WorkoutCard";

function WorkoutList({ workouts, onDelete }) {

  return (
    <div>
        <h2 className="full-list-header">Logged Workouts</h2>
        <ul className="workout card-container">{workouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} onDelete={onDelete}/>)}</ul>
    </div>
  );
}

export default WorkoutList;