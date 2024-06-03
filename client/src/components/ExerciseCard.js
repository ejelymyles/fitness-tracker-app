import React, { useState } from "react";
import NewExerciseForm from "./NewExerciseForm";

function ExerciseCard({ exercise, onDelete, onUpdate }){

    const{id, name, category, muscle_group, equipment, description} = exercise
    const [editMode, setEditMode]= useState(false);

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
            onDelete(id);
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
            onUpdate(updatedExercise);
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
                    <NewExerciseForm initialValues={{id , name, category, muscle_group, equipment, description}} onSubmit={handleEditExercise} onCancel={toggleEditMode} isEdit={true}/>
                ) : (
                    <div>
                        <h3>{name}</h3>
                        <p>Category: {category}</p>
                        <p>Muscle Group: {muscle_group}</p>
                        <p>Equipment Needed: {equipment}</p>
                        <p>Description: {description}</p> 
                        <p>Exercise Reference # {id}</p>
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
        </div>
    )
}

export default ExerciseCard;