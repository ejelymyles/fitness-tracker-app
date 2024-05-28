import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, UNSAFE_ErrorResponseImpl } from "react-router-dom";
import Header from './Header';
import ExerciseList from "./ExerciseList";

function App() {
  return(
    <div>
      <Header />
      <Routes>
        <Route path="exercises" element={<ExerciseList />} />
      </Routes>
    </div>
  );
}

export default App;
