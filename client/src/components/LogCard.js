import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import NewLogForm from "./NewLogForm";
import { MyContext } from "./MyContext";

function LogCard({ log }){

    const{sets, reps, weight, distance, time, exercise, workout_id, id } = log
    const exerciseName = exercise ? exercise.name : null;
    const { user_id } = useParams();
    const [editMode, setEditMode] = useState(false);

    const {deleteLog, updateLog} = useContext(MyContext);

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    // DELETE SPECIFIC LOG
    const handleDelete = () => {
        fetch(`/users/${user_id}/workouts/${workout_id}/logs/${id}`, {
            method: "DELETE",
        })
        .then((response) =>{
            if (!response.ok) {
                throw new Error("Network response error");
            }
            deleteLog(id); // UPDATE STATE
        })
        .catch((error) => {
            console.error("There was a problem deleting the workout:", error);
        })
    }


    // EDIT SPECIFIC LOG
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
            updateLog(updatedLog); //UPDATE STATE
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
                    <NewLogForm logValues={{id, sets, reps, weight, distance, time, workout_id}} onCancel={toggleEditMode} isEdit={true}/>
                ) : (
                    <div>
                        <p> Exercise: {exerciseName}</p>
                        <p>Sets: {sets}</p>
                        <p>Reps: {reps}</p>
                        <p>Weight: {weight} lbs</p>
                        <p>Distance: {distance} miles</p>
                        <p>Time: {time} seconds</p>
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
            <hr className="breakline"/>
        </div>
    )
}

export default LogCard;