import React, { useState } from "react";


function NewUserForm({addNewUser}){

// manage state of formData
// handle change function
// handle submit  -> make POST to /users -> reset the form values and update state 


    return(
        <div className='form'>
            <h1 className="full-list-header">Add New Workout Partners</h1>
            <form >
                <label htmlFor='username'>Username</label>
                <br />
                <input id="username" name='username' />
                <br />

                <label htmlFor='email'>Email Address</label>
                <br />
                <input id="email" name='email' />
                <br />

                <label htmlFor='age'>Age</label>
                <br />
                <input id="age" name='age' />
                <br />

                <label htmlFor='height'>Height</label>
                <br />
                <input id="height" name='height' />
                <br />

                <label htmlFor='weight'>Wieght</label>
                <br />

                <input id="weight" name="weight" />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewUserForm;