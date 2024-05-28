import React, { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";

function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
      fetch("/exercises")
      .then((r) =>r.json())
      .then((exercises) => {
        setExercises(exercises);
      })
    }, [])

  return (
    <div>
        <h1 className="full-list-header">Search For Exercises</h1>
        <ul className="exercise card-container">{exercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise}/>)}</ul>
    </div>
  );
}

export default ExerciseList;