import React, { useContext } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MyContext } from "./MyContext";


function NewUserForm({ onCancel, userValues, isEdit}){

    const{ addNewUser, handleEditUser } = useContext(MyContext);

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            age: "",
            height: "",
            weight: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            age: Yup.number().required("Age is required").positive("Age must be a positive number").integer("Age must be an integer"),
            height: Yup.number().required("Height is required").positive("Height must be a positive number").integer("Height must be an integer"),
            weight: Yup.number().required("Weight is required").positive("Weight must be a positive number").integer("Weight must be an integer"),
        }),
        onSubmit: (values, {setSubmitting, resetForm, setErrors}) => {
            const url = isEdit ? `/users/${userValues.id}` : "/users";
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
            .then((user) => {
                if(!isEdit) {
                    addNewUser(user); //UPDATE STATE
                    resetForm();
                } else {
                    handleEditUser(user); //MAKE PATCH (handleEditUser)
                }
            })
            .catch((err) => setErrors({api: err.errors || ["An error occurred"] }))
            .finally(() => setSubmitting(false));
        }
    })

    return(
        <div className='form'>
            <h2 className="list-header">{isEdit ? "Edit User" : "Submit Workout Partner"}</h2>
            <form onSubmit={formik.handleSubmit} >
                <label htmlFor='username'>Username</label>
                <br />
                <input id="username" name='username' type="text" onChange={formik.handleChange} value={formik.values.username}/>
                <p style={{ color: 'red'}}>{formik.errors.username}</p>
                <br />

                <label htmlFor='email'>Email Address</label>
                <br />
                <input id="email" name='email' type="text" onChange={formik.handleChange} value={formik.values.email} />
                <p style={{ color: 'red'}}>{formik.errors.email}</p>
                <br />

                <label htmlFor='age'>Age</label>
                <br />
                <input id="age" name='age' type="text" onChange={formik.handleChange} value={formik.values.age} />
                <p style={{ color: 'red'}}>{formik.errors.age}</p>
                <br />

                <label htmlFor='height'>Height (Inches)</label>
                <br />
                <input id="height" name='height' type="text" onChange={formik.handleChange} value={formik.values.height} />
                <p style={{ color: 'red'}}>{formik.errors.height}</p>
                <br />

                <label htmlFor='weight'>Weight (lbs)</label>
                <br />

                <input id="weight" name="weight" type="text" onChange={formik.handleChange} value={formik.values.weight}/>
                <p style={{ color: 'red'}}>{formik.errors.weight}</p>
                <br />
                <button type="submit">{isEdit ? "Update" : "Submit"}</button>
                {isEdit && <button type="cancel" onClick={onCancel}>Cancel</button>}
            </form>
        </div>
    )
}
export default NewUserForm;