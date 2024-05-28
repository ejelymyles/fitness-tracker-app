import React, { useState } from "react";


function NewExerciseForm(){

// manage state of formData
// handle change function
// handle submit  -> make POST to /users -> reset the form values and update state 


    return(
        <div className='form'>
            <form >
                <label htmlFor='name'>Name</label>
                <br />
                <input id="name" name='name' />
                <br />

                <label htmlFor='category'>category</label>
                <br />
                <input id="caregory" name='category' />
                <br />

                <label htmlFor='muscle_group'>Muscle Group</label>
                <br />
                <input id="muscle_group" name='muscle_group' />
                <br />

                <label htmlFor='equipment'>Equipment Needed</label>
                <br />
                <input id="equipment" name='equipment' />
                <br />

                <label htmlFor='description'>Description</label>
                <br />
                <input id="description" name="description" />
                <br />
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default NewExerciseForm;