import React from "react";
import { NavLink } from "react-router-dom";

function WorkoutCard({ workout, onDelete }){

    const{id, user_id, date, duration } = workout

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

    return(
        <div>
            <li className="card">
                <h3>Workout Session</h3>
                <p>Date: {date}</p>
                <p>Duration: {duration} minutes</p>
                <NavLink to={`/users/${user_id}/workouts/${id}`} className="cardnav-link">View Workout Details</NavLink> 
            </li> 
            <br />
            <button>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default WorkoutCard;