import React from "react";
import { NavLink } from "react-router-dom";

function UserCard({ user, onDelete }){

    const{id, username, email , age, height, weight} = user

    const handleDelete = () => {
        fetch(`/users/${id}`, {
            method: "DELETE",
        })
        .then((response) =>{
            if (!response.ok) {
                throw new Error("Network response error");
            }
            onDelete(id);
        })
        .catch((error) => {
            console.error("There was a problem deleting the user:", error);
        })
    }

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
            <br />
            <button>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <hr />
        </div>
    )
}

export default UserCard;