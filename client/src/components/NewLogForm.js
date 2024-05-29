import React, { useState } from "react";


function NewLogForm(){

// manage state of formData
// handle change function
// handle submit  -> make POST to /users/id/workout/id/logs -> reset the form values and update state 


    return(
        <div className='form'>
            <h1 className="full-list-header">Log Exercise</h1>
            <form >
                <label htmlFor='exercise_reference'>Exercise Reference Number</label>
                <br />
                <input id="exercise_reference" name='exercise_reference' />
                <br />

                <label htmlFor='sets'>Number of Sets</label>
                <br />
                <input id="sets" name='sets' />
                <br />

                <label htmlFor='reps'>Number of Reps</label>
                <br />
                <input id="reps" name='reps' />
                <br />

                <label htmlFor='weight'>Weight</label>
                <br />
                <input id="weight" name='weight' />
                <br />

                <label htmlFor='distance'>Distance</label>
                <br />

                <input id="distance" name="distance" />
                <br />

                <label htmlFor='time'>Time</label>
                <br />

                <input id="time" name="time" />
                <br />
                <button type="submit">Log</button>
            </form>
        </div>
    )
}

export default NewLogForm;