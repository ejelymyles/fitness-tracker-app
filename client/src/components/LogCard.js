import React from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

function LogCard({ log, onDelete }){

    const{sets, reps, weight, distance, time, exercise, workout_id, id } = log
    const exerciseName = exercise ? exercise.name : null;
    const { user_id } = useParams();

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

    return(
        <div>
            <li className="card">
                <p> Exercise: {exerciseName}</p>
                <p>Sets: {sets}</p>
                <p>Reps: {reps}</p>
                <p>Weight: {weight} lbs</p>
                <p>Distance: {distance} miles</p>
                <p>Time: {time} seconds</p>
                {/* <NavLink to={`/users/${user_id}/workouts/${id}`} className="cardnav-link">View Workout Details</NavLink>  */}
            </li> 
            <br />
            <button>Edit</button>
            <button onClick={handleDelete}>Delete</button> 
            <hr />
        </div>
    )
}

export default LogCard;