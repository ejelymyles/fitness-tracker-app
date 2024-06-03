import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WorkoutCard from "./WorkoutCard";

function WorkoutList({ workouts, onDelete, onUpdate }) {

  return (
    <div>
        <h2 className="list-header">Logged Workouts</h2>
        <ul className="workout card-container">{workouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} onDelete={onDelete} onUpdate={onUpdate}/>)}</ul>
    </div>
  );
}

export default WorkoutList;