import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(){
    return(
        <div>
            <NavLink exact to ="/" className="nav-link">Home</NavLink>
            <NavLink to="/exercises" className="nav-link">Find Exercises</NavLink>
            <NavLink to="/users" className="nav-link">Find a Workout Buddy</NavLink>
            <NavLink to="/workout" className="nav-link">My Fitness</NavLink>
            <NavLink to="/gyms" className="nav-link">Gym Locator</NavLink>
        </div>
    )
}

export default NavBar;