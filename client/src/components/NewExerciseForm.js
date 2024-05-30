import React, { useState } from "react";


function NewExerciseForm({ addNewExercise}){

    // manage state of formData
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        muscle_group: "",
        equipment: "",
        description: "",
    });

    const [errors, setErrors] = useState([]);

    // handle change function
    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    // handle submit  -> make POST to /users -> reset the form values and update state
    function handleSubmit (e){
        e.preventDefault();
        fetch("/exercises", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": formData.name,
                "category": formData.category,
                "muscle_group": formData.muscle_group,
                "equipment": formData.equipment,
                "description": formData.description
            })
        })
        //error handling 
        .then((r) => {
            if (r.ok) {
                return r.json();
            } else{
                return r.json().then((err) => Promise.reject(err));
            }
        })
        // pass a function to update state of exercises from wherever that data is held
        .then((newExercise) => {
            addNewExercise(newExercise);
            setFormData({
                name: "",
                category: "",
                muscle_group: "",
                equipment: "",
                description: "",
            });
        })
        .catch((err) => setErrors(err.errors || ["An error occured"]));
    }
 
    return(
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <br />
                <input id="name" name='name' type="text" value={formData.name} onChange={handleChange} />
                <br />

                <label htmlFor='category'>category</label>
                <br />
                <input id="caregory" name='category' type="text" value={formData.category} onChange={handleChange}/>
                <br />

                <label htmlFor='muscle_group'>Muscle Group</label>
                <br />
                <input id="muscle_group" name='muscle_group' type="text" value={formData.muscle_group} onChange={handleChange}/>
                <br />

                <label htmlFor='equipment'>Equipment Needed</label>
                <br />
                <input id="equipment" name='equipment'type="text" value={formData.equipment} onChange={handleChange}/>
                <br />

                <label htmlFor='description'>Description</label>
                <br />
                <input id="description" name="description" type="text" value={formData.description} onChange={handleChange} />
                <br />
                <button type="submit">Post</button>
            </form>
            {errors.length > 0 && (
                <div className="error-messages">
                    {errors.map((error, index) => (
                        <p key={index} style={{ color: "red" }}>
                            {error}
                        </p>
                    ))}
                </div>
                )}
        </div>
    )
}

export default NewExerciseForm;