import React, { useEffect, useState } from "react";
import ExerciseList from "./ExerciseList";
import NewExerciseForm from "./NewExerciseForm";

function ExercisePage(){

    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch("/exercises")
        .then((r) =>r.json())
        .then((exercises) => {
          setExercises(exercises);
        })
      }, [])

    function addNewExercise(newExercise){
        setExercises((prevData) => [...prevData, newExercise]);
    }

    const deleteExercise = (exerciseId) => {
        setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
      };

    const updateExercise = (updatedExercise) => {
        setExercises((prevExercises) => prevExercises.map((exercise) => (exercise.id === updatedExercise.id ? updatedExercise : exercise)));
      };



    return(
        <div>
            <h2>Post A New Exercise To The Community</h2>
            <NewExerciseForm addNewExercise={addNewExercise}/>
            <hr />
            <ExerciseList exercises={exercises} onDelete={deleteExercise} onUpdate={updateExercise}/>
        </div>
    )
}

export default ExercisePage;