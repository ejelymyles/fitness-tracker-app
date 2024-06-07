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

    const handleDelete = () => {
        fetch(`/users/${user_id}/workouts/${workout_id}/logs/${id}`, {
            method: "DELETE",
        })
        .then((response) =>{
            if (!response.ok) {
                throw new Error("Network response error");
            }
            deleteLog(id); 
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
            updateLog(updatedLog); 
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
                    <NewLogForm logValues={{id, sets, reps, weight, distance, time, workout_id}} editLog={handleEditLog} onCancel={toggleEditMode} isEdit={true}/>
                ) : (
                    <div>
                        <p className="card-text">Exercise: <span className="card-value">{exerciseName}</span> </p>
                        <p className="card-text">Sets: <span className="card-value">{sets}</span> </p>
                        <p className="card-text">Reps: <span className="card-value">{reps}</span> </p>
                        <p className="card-text">Weight: <span className="card-value">{weight} lbs</span> </p>
                        <p className="card-text">Distance: <span className="card-value">{distance} miles</span> </p>
                        <p className="card-text">Time: <span className="card-value">{time} seconds</span> </p>
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

export default LogCard;