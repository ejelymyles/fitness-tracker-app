import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, UNSAFE_ErrorResponseImpl } from "react-router-dom";
import Header from './Header';
import ExercisePage from "./ExercisePage";
import NewUserForm from "./NewUserForm.js";
import MyFitnessPage from "./MyFitnessPage";
import UserProfile from "./UserProfile";

function App() {
  return(
    <div>
      <Header />
      <Routes>
        <Route path="/exercises" element={<ExercisePage />} />
        <Route path="/newuser" element={<NewUserForm />}/>
        <Route path="/myfitness" element={<MyFitnessPage />}/>
        <Route path="/users/:id" element={<UserProfile />}/>
      </Routes>
    </div>
  );
}

export default App;
