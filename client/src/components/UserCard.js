import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import NewUserForm from "./NewUserForm";
import { MyContext } from "./MyContext";

function UserCard({ user }){

    const {deleteUser, updateUser} = useContext(MyContext);
    const [editMode, setEditMode] = useState(false);

    const{id, username, email , age, height, weight} = user;

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    // DELETE SPECIFIC USER
    const handleDelete = () => {
        fetch(`/users/${id}`, {
            method: "DELETE",
        })
        .then((response) =>{
            if (!response.ok) {
                throw new Error("Network response error");
            }
            deleteUser(id); //UPDATE STATE
        })
        .catch((error) => {
            console.error("There was a problem deleting the user:", error);
        })
    }

        //EDIT SPEFICIC USER
    const handleEditUser = (values) => {
        fetch(`/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error("Network response error");
            }
            return response.json();
        })
        .then((updatedUser) => {
            updateUser(updatedUser); //UPDATE STATE
            toggleEditMode();
        })
        .catch((error) => {
            console.error("There was a problem updating the user:", error);
        });
    };

    return(
        <div className="card">
            <li>
                {editMode ? (
                    <NewUserForm initialValues={{ id, username, email, age, height, weight}} onCancel={toggleEditMode} isEdit={true}/>
                ) : (
                    <div>
                        <h3>{username}</h3>
                        <p>email: {email}</p>
                        <p>age: {age}</p>
                        <p>height: {height}''</p>
                        <p>weight: {weight} lbs</p> 
                        <NavLink to={`/users/${id}`} className="cardnav-link">View User Profile</NavLink> 
                    </div>
                )}
            </li>  
            <br />
            {!editMode && (
                <div>
                    <button type="edit" onClick={toggleEditMode}>Edit</button>
                    <button type="delete" onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default UserCard;