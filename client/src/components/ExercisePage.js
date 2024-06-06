import React from "react";
import ExerciseList from "./ExerciseList";
import NewExerciseForm from "./NewExerciseForm";

function ExercisePage(){
    return(
        <div>
            <NewExerciseForm />
            <hr className="breakline"/>
            <ExerciseList />
        </div>
    )
}
export default ExercisePage;