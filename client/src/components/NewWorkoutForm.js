import React, { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from "react-router-dom";


function NewWorkoutForm({ addNewWorkout }){

    const { id } = useParams(); //access the id from the url to make the fetch 

    const formik = useFormik({
        initialValues: {
            date: "",
            duration: "",
        },
        validationSchema: Yup.object({
            date: Yup.date().required("Date is required"),
            duration: Yup.number().required("Duration is required").positive("Duration must be greater than 0"),

        }),
        onSubmit: (values, {setSubmitting, resetForm, setErrors}) => {
            fetch(`/users/${id}/workouts`, {
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
            .then((newWorkout) => {
                addNewWorkout(newWorkout);
                resetForm();
            })
            .catch((err) => setErrors({api: err.errors || ["An error occurred"] }))
            .finally(() => setSubmitting(false));
        }
    })


    return(
        <div className='form'>
            <h3 className="full-list-header">Add New Workout Session</h3>
            <form >
                <label htmlFor='date'>Date</label>
                <br />
                <input id="date" name='date' type="text" onChange={formik.handleChange} value={formik.values.date}/>
                <p style={{ color: 'red'}}>{formik.errors.date}</p>
                <br />

                <label htmlFor='duration'>Duration</label>
                <br />
                <input id="duration" name='duration' type="text" onChange={formik.handleChange} value={formik.values.duration}/>
                <p style={{ color: 'red'}}>{formik.errors.duration}</p>
                <br />
                <button type="submit">Add Session</button>
            </form>
        </div>
    )
}

export default NewWorkoutForm;