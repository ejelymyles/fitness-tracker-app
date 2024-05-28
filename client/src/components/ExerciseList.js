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
        <h2 className="full-list-header">Search For Exercises</h2>
        <ul className="exercise card-container">{exercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise}/>)}</ul>
    </div>
  );
}

export default ExerciseList;