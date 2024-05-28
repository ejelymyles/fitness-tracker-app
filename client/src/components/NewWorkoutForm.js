import React, { useState } from "react";


function NewWorkoutForm(){

// manage state of formData
// handle change function
// handle submit  -> make POST to /users/id/workouts -> reset the form values and update state 


    return(
        <div className='form'>
            <h3 className="full-list-header">Add New Workout Session</h3>
            <form >
                <label htmlFor='date'>Date</label>
                <br />
                <input id="date" name='date' />
                <br />

                <label htmlFor='duration'>Duration</label>
                <br />
                <input id="duration" name='duration' />
                <br />
                <button type="submit">Add Session</button>
            </form>
        </div>
    )
}

export default NewWorkoutForm;