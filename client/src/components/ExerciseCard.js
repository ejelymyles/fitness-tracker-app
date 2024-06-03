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
        <div>
            <li className="card">
                {editMode ? (
                    <NewExerciseForm initialValues={{id , name, category, muscle_group, equipment, description}} onSubmit={handleEditExercise} onCancel={toggleEditMode} isEdit={true}/>
                ) : (
                    <div>
                        <h3>{name}</h3>
                        <p>category: {category}</p>
                        <p>muscle_group: {muscle_group}</p>
                        <p>equipment needed: {equipment}</p>
                        <p>description: {description}</p> 
                        <p>exercise reference: {id}</p>
                    </div>
                )}
            </li>  
            <br />
            {!editMode && (
                <div>
                    <button onClick={toggleEditMode}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default ExerciseCard;