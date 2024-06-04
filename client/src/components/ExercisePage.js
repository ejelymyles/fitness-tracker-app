import React, { useEffect, useState } from "react";
import ExerciseList from "./ExerciseList";
import NewExerciseForm from "./NewExerciseForm";
import { MyContext } from "./MyContext";

function ExercisePage(){

    return(
        <div>
            <h2 className="list-header">Post A New Exercise To The Community</h2>
            <NewExerciseForm />
            <hr className="breakline"/>
            <ExerciseList />
        </div>
    )
}


export default ExercisePage;