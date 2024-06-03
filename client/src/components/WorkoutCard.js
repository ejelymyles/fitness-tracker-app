import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import NewWorkoutForm from "./NewWorkoutForm";

function WorkoutCard({ workout, onDelete, onUpdate }){

    const{id, user_id, date, duration } = workout
    const [editMode, setEditMode]= useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const handleDelete = () => {
        fetch(`/users/${user_id}/workouts/${id}`, {
            method: "DELETE",
        })
        .then((response) =>{
            if (!response.ok) {
                throw new Error("Network response error");
            }
            onDelete(id);
        })
        .catch((error) => {
            console.error("There was a problem deleting the workout:", error);
        })
    }

    const handleEditWorkout = (values) => {
        fetch(`/users/${user_id}/workouts/${id}`, {
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
        .then((updatedWorkout) => {
            onUpdate(updatedWorkout);
            toggleEditMode();
        })
        .catch((error) => {
            console.error("There was a problem updating the user:", error);
        });
    };



    return(
        <div>
            <li className="card">
                {editMode ? (
                    <NewWorkoutForm initialValues={{id, user_id, date, duration}} onSubmit={handleEditWorkout} onCancel={toggleEditMode} isEdit={true}/>
                ) : (
                    <div>
                        <h3>Workout Session</h3>
                        <p>Date: {date}</p>
                        <p>Duration: {duration} minutes</p>
                         <NavLink to={`/users/${user_id}/workouts/${id}`} className="cardnav-link">View Workout Details</NavLink> 
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

export default WorkoutCard;