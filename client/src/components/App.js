import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, UNSAFE_ErrorResponseImpl } from "react-router-dom";
import Header from './Header';
import ExercisePage from "./ExercisePage";
import NewUserForm from "./NewUserForm.js";
// import MyFitnessPage from "./MyFitnessPage";
import UserProfile from "./UserProfile";
import WorkoutDetails from "./WorkoutDetailsPage";
import UserList from "./UserList";

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
      fetch("/users")
      .then((r) =>r.json())
      .then((users) => {
        setUsers(users);
      })
    }, [])

  return(
    <div>
      <Header />
      <Routes>
        <Route path="/exercises" element={<ExercisePage />} />
        <Route path="/newuser" element={<NewUserForm />}/>
        <Route path="/myfitness" element={<UserList users={users} />}/>
        <Route path="/users/:id" element={<UserProfile />}/>
        <Route path="/users/:user_id/workouts/:workout_id" element={<WorkoutDetails />}/>
      </Routes>
    </div>
  );
}

export default App;
