import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import NewWorkoutForm from "./NewWorkoutForm";
import { MyContext } from "./MyContext";

function WorkoutCard({ workout }){

    const {updateWorkout, deleteWorkout} = useContext(MyContext);

    const{id, user_id, date, duration } = workout
    const [editMode, setEditMode]= useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    // DELETE SPECIFIC WORKOUT
    const handleDelete = () => {
        fetch(`/users/${user_id}/workouts/${id}`, {
            method: "DELETE",
        })
        .then((response) =>{
            if (!response.ok) {
                throw new Error("Network response error");
            }
            deleteWorkout(id); //UPDATE STATE
        })
        .catch((error) => {
            console.error("There was a problem deleting the workout:", error);
        })
    }

    // EDIT SPECIFIC WORKOUT 
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
            updateWorkout(updatedWorkout); // UPDATE STATE
            toggleEditMode();
        })
        .catch((error) => {
            console.error("There was a problem updating the user:", error);
        });
    };



    return(
        <div className="card">
            <li >
                {editMode ? (
                    <NewWorkoutForm initialValues={{id, user_id, date, duration}} onCancel={toggleEditMode} isEdit={true}/>
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
                    <button type="edit" onClick={toggleEditMode}>Edit</button>
                    <button type="delete" onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    )
}

// pass onSubmit={handleEditWorkout} to form 

export default WorkoutCard;