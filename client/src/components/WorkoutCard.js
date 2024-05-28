import React from "react";
import { NavLink } from "react-router-dom";

function WorkoutCard({ workout }){

    const{id, user_id, date, duration } = workout

    return(
        <div>
            <li className="card">
                <h3>Workout Session</h3>
                <p>Date: {date}</p>
                <p>Duration: {duration} minutes</p>
                <NavLink to={`/users/${user_id}/workouts/${id}`} className="cardnav-link">View Workout Details</NavLink> 
            </li>  
        </div>
    )
}

export default WorkoutCard;