import React from "react";
import { NavLink } from "react-router-dom";

function UserCard({ user }){

    const{id, username, email , age, height, weight} = user

    return(
        <div>
            <li className="card">
                <h2>{username}</h2>
                <p>email: {email}</p>
                <p>age: {age}</p>
                <p>height: {height}</p>
                <p>weight: {weight}</p> 
                <NavLink to={`/users/${id}`} className="cardnav-link">View User Profile</NavLink> 
            </li>  
        </div>
    )
}

export default UserCard;