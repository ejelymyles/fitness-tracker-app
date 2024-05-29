import React from "react";

function ExerciseCard({ exercise }){

    const{id, name, category, muscle_group, equipment, description} = exercise

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
            <button>Delete</button>
        </div>
    )
}

export default ExerciseCard;