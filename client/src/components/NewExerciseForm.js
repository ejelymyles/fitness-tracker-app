import React, { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';


function NewExerciseForm({ addNewExercise}){

    const formik = useFormik({
        initialValues: {
            name: "",
            category: "",
            muscle_group: "",
            equipment: "",
            description: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            category: Yup.string().oneOf(["cardio", "strength"], "Category must be either 'cardio' or 'strength'").required("Category is required"),
            muscle_group: Yup.string().required("Muscle group is required"),
            equipment: Yup.string(),
            description: Yup.string()
        }),
        onSubmit: (values, {setSubmitting, resetForm, setErrors}) => {
            fetch("/exercises", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            .then((r) => {
                if (r.ok) {
                    return r.json();
                } else {
                    return r.json().then((err) => Promise.reject(err));
                }
            })
            .then((newExercise) => {
                addNewExercise(newExercise);
                resetForm();
            })
            .catch((err) => setErrors({api: err.errors || ["An error occurred"] }))
            .finally(() => setSubmitting(false));
        }
    })
 
    return(
        <div className='form'>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='name'>Name</label>
                <br />
                <input id="name" name='name' type="text" onChange={formik.handleChange} value={formik.values.name} />
                <p style={{ color: 'red'}}>{formik.errors.name}</p>
                <br />

                <label htmlFor='category'>category</label>
                <br />
                <input id="category" name='category' type="text" onChange={formik.handleChange} value={formik.values.category}/>
                <p style={{ color: 'red'}}>{formik.errors.category}</p>
                <br />

                <label htmlFor='muscle_group'>Muscle Group</label>
                <br />
                <input id="muscle_group" name='muscle_group' type="text" onChange={formik.handleChange} value={formik.values.muscle_group}/>
                <p style={{ color: 'red'}}>{formik.errors.muscle_group}</p>
                <br />

                <label htmlFor='equipment'>Equipment Needed</label>
                <br />
                <input id="equipment" name='equipment'type="text" onChange={formik.handleChange} value={formik.values.equipment}/>
                <p style={{ color: 'red'}}>{formik.errors.equipment}</p>
                <br />

                <label htmlFor='description'>Description</label>
                <br />
                <input id="description" name="description" type="text" onChange={formik.handleChange} value={formik.values.description} />
                <p style={{ color: 'red'}}>{formik.errors.description}</p>
                <br />
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default NewExerciseForm;