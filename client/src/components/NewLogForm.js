import React, { useContext, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from "react-router-dom";
import { MyContext } from "./MyContext";


function NewLogForm({ onCancel, editLog, logValues, isEdit }){

    const { addNewLog } = useContext(MyContext);
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
            exercise_id: Yup.number().required("Exercise reference number is required").typeError("Exercise Reference must be a number"),
            sets: Yup.number().required("Sets are required").positive("Sets must be greater than 0").typeError("Sets must be a number"),
            reps: Yup.number().required("Reps are required").positive("Reps must be greater than 0").typeError("Reps must be a number"),
            weight: Yup.number().positive("Weight is measured in pounds and must be greater than 0").typeError("Weight must be a number"),
            distance: Yup.number().positive("Distance is measured in miles and must be greater than 0").typeError("Distance must be a number"),
            time: Yup.number().positive("Time is measured in minutes and must be greater than 0").typeError("Time must be a number"),

        }),
        onSubmit: (values, {setSubmitting, resetForm, setErrors}) => {
            const url = isEdit ? `/users/${user_id}/workouts/${workout_id}/logs/${logValues.id}` : `/users/${user_id}/workouts/${workout_id}/logs`;
            const method = isEdit ? "PATCH" : "POST";
            
            fetch(url, {
                method: method,
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
            .then((log) => {
                if(!isEdit) {
                    addNewLog(log); 
                    resetForm();
                } else {
                    editLog(log)
                }
            })
            .catch((err) => setErrors({api: err.errors || ["An error occurred"] }))
            .finally(() => setSubmitting(false));
        }
    })

    return(
        <div className='form'>
            <h2 className="list-header">{isEdit ? "Edit Log" : "Log New Exercise"}</h2> 
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

                <label htmlFor='weight'>Weight (lbs)</label>
                <br />
                <input id="weight" name='weight' type="text" onChange={formik.handleChange} value={formik.values.weight} />
                <p style={{ color: 'red'}}>{formik.errors.weight}</p>
                <br />

                <label htmlFor='distance'>Distance (miles)</label>
                <br />

                <input id="distance" name="distance" type="text" onChange={formik.handleChange} value={formik.values.distance} />
                <p style={{ color: 'red'}}>{formik.errors.distance}</p>
                <br />

                <label htmlFor='time'>Time (seconds)</label>
                <br />

                <input id="time" name="time" type="text" onChange={formik.handleChange} value={formik.values.time}/>
                <p style={{ color: 'red'}}>{formik.errors.time}</p>
                <br />
                <button type="submit">{isEdit ? "Update" : "Log"}</button>
                {isEdit && <button type="cancel" onClick={onCancel}>Cancel</button>}
            </form>
        </div>
    )
}
export default NewLogForm;