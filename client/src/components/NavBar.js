import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(){
    return(
        <div>
            <NavLink exact to ="/" className="nav-link">Home</NavLink>
            <NavLink to="/exercises" className="nav-link">Exercise Hub</NavLink>
            <NavLink to="/newuser" className="nav-link">New Workout Partners</NavLink>
            <NavLink to="/myfitness" className="nav-link">Fitness Hub</NavLink>
            <NavLink to="/gyms" className="nav-link">Gym Locator</NavLink>
        </div>
    )
}
export default NavBar;