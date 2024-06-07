import React, { useContext, useState } from "react";
import NewExerciseForm from "./NewExerciseForm";
import { MyContext } from "./MyContext";

function ExerciseCard({ exercise }){

    const {updateExercise, deleteExercise} = useContext(MyContext);
    const [editMode, setEditMode]= useState(false);

    const{id, name, category, muscle_group, equipment, description} = exercise

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const handleDelete = () => {
        fetch(`/exercises/${id}`, {
            method: "DELETE",
        })
        .then((response) =>{
            if (!response.ok) {
                throw new Error("Network response error");
            }
            deleteExercise(id);
        })
        .catch((error) => {
            console.error("There was a problem deleting the user:", error);
        })
    }

    
    const handleEditExercise = (values) => {
        fetch(`/exercises/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error("Network response error");
            }
            return response.json();
        })
        .then((updatedExercise) => {
            updateExercise(updatedExercise);
            toggleEditMode();
        })
        .catch((error) => {
            console.error("There was a problem updating the exercise:", error);
        });
    };

    return(
        <div className="card">
            <li >
                {editMode ? (
                    <NewExerciseForm exerciseValues={{id , name, category, muscle_group, equipment, description}} editExercise={handleEditExercise} onCancel={toggleEditMode} isEdit={true} />
                ) : (
                    <div>
                        <h3 className="card-text">{name}</h3>
                        <p className="card-text">Category: <span className="card-value">{category}</span> </p>
                        <p className="card-text">Muscle Group: <span className="card-value">{muscle_group}</span> </p>
                        <p className="card-text">Equipment Needed: <span className="card-value">{equipment}</span> </p>
                        <p className="card-text">Description: <span className="card-value">{description}</span> </p> 
                        <p className="card-text">Exercise Reference # <span className="card-value">{id}</span> </p>
                    </div>
                )}
            </li>  
            <br className="breakline"/>
            {!editMode && (
                <div>
                    <button type="edit" onClick={toggleEditMode}>Edit</button>
                    <button type="delete" onClick={handleDelete}>Delete</button>
                </div>
            )}
            <hr className="card-breakline"/>
        </div>
    )
}
export default ExerciseCard;
