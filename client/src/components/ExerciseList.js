import React, { useContext, useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import { MyContext } from "./MyContext";

function ExerciseList() {
    const {exercises} = useContext(MyContext);

  return (
    <div>
        <h2 className="list-header">Search For Exercises</h2>
        <ul className="exercise card-container">{exercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise}/>)}</ul>
    </div>
  );
}

export default ExerciseList;