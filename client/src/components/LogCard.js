import React from "react";
import { NavLink } from "react-router-dom";

function LogCard({ log }){

    const{id, exercise_id, sets, reps, weight, distance, time, exercise } = log
    const exerciseName = exercise ? exercise.name : null;

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
            <button>Delete</button> 
            <hr />
        </div>
    )
}

export default LogCard;