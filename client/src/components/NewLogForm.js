import React, { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from "react-router-dom";


function NewLogForm({ addNewLog }){

    const { user_id, workout_id } = useParams();

    const formik = useFormik({
        initialValues: {
            exercise_id: "",
            sets: "",
            reps: "",
            weight: "",
            distance: "",
            time: "",
        },
        validationSchema: Yup.object({
            exercise_id: Yup.number().required("Exercise reference number is required"),
            sets: Yup.number().required("Sets are required").positive("Sets must be greater than 0"),
            reps: Yup.number().required("Reps are required").positive("Reps must be greater than 0"),
            weight: Yup.number().positive("Weight is measured in pounds and must be greater than 0"),
            distance: Yup.number().positive("Distance is measured in miles and must be greater than 0"),
            time: Yup.number().positive("Time is measured in minutes and must be greater than 0"),

        }),
        onSubmit: (values, {setSubmitting, resetForm, setErrors}) => {
            fetch(`/users/${user_id}/workouts/${workout_id}/logs`, {
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
            .then((newLog) => {
                addNewLog(newLog);
                resetForm();
            })
            .catch((err) => setErrors({api: err.errors || ["An error occurred"] }))
            .finally(() => setSubmitting(false));
        }
    })


    return(
        <div className='form'>
            <h1 className="full-list-header">Log Exercise</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='exercise_id'>Exercise Reference Number</label>
                <br />
                <input id="exercise_id" name='exercise_id' type="text" onChange={formik.handleChange} value={formik.values.exercise_id}/>
                <p style={{ color: 'red'}}>{formik.errors.exercise_id}</p>
                <br />

                <label htmlFor='sets'>Number of Sets</label>
                <br />
                <input id="sets" name='sets' type="text" onChange={formik.handleChange} value={formik.values.sets}/>
                <p style={{ color: 'red'}}>{formik.errors.sets}</p>
                <br />

                <label htmlFor='reps'>Number of Reps</label>
                <br />
                <input id="reps" name='reps' type="text" onChange={formik.handleChange} value={formik.values.reps}/>
                <p style={{ color: 'red'}}>{formik.errors.reps}</p>
                <br />

                <label htmlFor='weight'>Weight</label>
                <br />
                <input id="weight" name='weight' type="text" onChange={formik.handleChange} value={formik.values.weight} />
                <p style={{ color: 'red'}}>{formik.errors.weight}</p>
                <br />

                <label htmlFor='distance'>Distance</label>
                <br />

                <input id="distance" name="distance" type="text" onChange={formik.handleChange} value={formik.values.distance} />
                <p style={{ color: 'red'}}>{formik.errors.distance}</p>
                <br />

                <label htmlFor='time'>Time</label>
                <br />

                <input id="time" name="time" type="text" onChange={formik.handleChange} value={formik.values.time}/>
                <p style={{ color: 'red'}}>{formik.errors.time}</p>
                <br />
                <button type="submit">Log</button>
            </form>
        </div>
    )
}

export default NewLogForm;