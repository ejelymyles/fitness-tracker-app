import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import NewLogForm from "./NewLogForm";

function LogCard({ log, onDelete, onUpdate}){

    const{sets, reps, weight, distance, time, exercise, workout_id, id } = log
    const exerciseName = exercise ? exercise.name : null;
    const { user_id } = useParams();
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const handleDelete = () => {
        fetch(`/users/${user_id}/workouts/${workout_id}/logs/${id}`, {
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

    const handleEditLog = (values) => {
        fetch(`/users/${user_id}/workouts/${workout_id}/logs/${id}`, {
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
        .then((updatedLog) => {
            onUpdate(updatedLog);
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
                    <NewLogForm initialValues={{id, sets, reps, weight, distance, time, workout_id}} onSubmit={handleEditLog} onCancel={toggleEditMode} isEdit={true}/>
                ) : (
                    <div>
                        <p> Exercise: {exerciseName}</p>
                        <p>Sets: {sets}</p>
                        <p>Reps: {reps}</p>
                        <p>Weight: {weight} lbs</p>
                        <p>Distance: {distance} miles</p>
                        <p>Time: {time} seconds</p>
                        {/* <NavLink to={`/users/${user_id}/workouts/${id}`} className="cardnav-link">View Workout Details</NavLink>  */}
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
            <hr />
        </div>
    )
}

export default LogCard;