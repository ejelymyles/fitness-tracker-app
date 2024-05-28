import React from "react";
import ExerciseList from "./ExerciseList";
import NewExerciseForm from "./NewExerciseForm";

function ExercisePage(){

    return(
        <div>
            <h2>Post A New Exercise To The Community</h2>
            <NewExerciseForm />
            <hr />
            <ExerciseList />
        </div>
    )
}

export default ExercisePage;