import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import NewWorkoutForm from "./NewWorkoutForm";
import { MyContext } from "./MyContext";

function WorkoutCard({ workout }){

    const {updateWorkout, deleteWorkout} = useContext(MyContext);
    const [editMode, setEditMode]= useState(false);

    const{id, user_id, date, duration } = workout

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
                    <NewWorkoutForm workoutValues={{id, user_id, date, duration}} onCancel={toggleEditMode} isEdit={true}/>
                ) : (
                    <div>
                        <h3 className="card-text">Workout Session</h3>
                        <p className="card-text">Date: <span className="card-value">{date}</span> </p>
                        <p className="card-text">Duration: <span className="card-value">{duration} minutes</span> </p>
                        <br />
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
            <hr className="card-breakline"/>
        </div>
        
    )
}
export default WorkoutCard;