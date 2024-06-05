import React, { useContext, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from "react-router-dom";
import { MyContext } from "./MyContext";

function NewWorkoutForm({ onCancel, initialValues, isEdit }){

    const { handleEditWorkout, addNewWorkout} = useContext(MyContext);

    const { id } = useParams();

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
            const url = isEdit ? `/users/${initialValues.user_id}/workouts/${initialValues.id}` : `/users/${id}/workouts`;
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
            .then((workout) => {
                if(!isEdit) {
                    addNewWorkout(workout); //UPDATE STATE
                    resetForm();
                } else {
                    handleEditWorkout(workout); //MAKE PATCH (handleEditWorkout)
                }
            })
            .catch((err) => setErrors({api: err.errors || ["An error occurred"] }))
            .finally(() => setSubmitting(false));
        }
    })


    return(
        <div className='form'>
            <h2 className="list-header">{isEdit ? "Edit Workout" : "Add Workout Session"}</h2>
            <form onSubmit={formik.handleSubmit} >
                <label htmlFor='date'>Date</label>
                <br />
                <input id="date" name='date' type="text" placeholder="YYYY-MM-DD" onChange={formik.handleChange} value={formik.values.date}/>
                <p style={{ color: 'red'}}>{formik.errors.date}</p>
                <br />

                <label htmlFor='duration'>Duration</label>
                <br />
                <input id="duration" name='duration' type="text" onChange={formik.handleChange} value={formik.values.duration}/>
                <p style={{ color: 'red'}}>{formik.errors.duration}</p>
                <br />
                <button type="submit">{isEdit ? "Update" : "Add Session"}</button>
                {isEdit && <button type="cancel" onClick={onCancel}>Cancel</button>}
            </form>
        </div>
    )
}

export default NewWorkoutForm;