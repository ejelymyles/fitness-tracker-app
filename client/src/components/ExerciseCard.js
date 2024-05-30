import React from "react";

function ExerciseCard({ exercise, onDelete }){

    const{id, name, category, muscle_group, equipment, description} = exercise

    const handleDelete = () => {
        fetch(`/exercises/${id}`, {
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
                <h2>{name}</h2>
                <p>category: {category}</p>
                <p>muscle_group: {muscle_group}</p>
                <p>equipment needed: {equipment}</p>
                <p>description: {description}</p> 
                <p>exercise reference: {id}</p>
            </li>  
            <button>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default ExerciseCard;