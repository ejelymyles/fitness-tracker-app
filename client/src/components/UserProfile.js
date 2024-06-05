import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WorkoutList from "./WorkoutList";
import NewWorkoutForm from "./NewWorkoutForm";
import { MyContext } from "./MyContext";

function UserProfile() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

const { setWorkouts } = useContext(MyContext);

//fetch user data to display on user profile
  useEffect(() => {
    fetch(`/users/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
      });
  }, [id]);

  //fetch the users workout data to pass to their workoutlist
  useEffect(() => {
    fetch(`/users/${id}/workouts`)
    .then((r) =>r.json())
    .then((workouts) => {
      setWorkouts(workouts);
    })
  }, [id, setWorkouts]);


  if (!user) {
    return <div>Loading...</div>;
  }

  const { username, email, age, height, weight } = user;


  return (
    <div>
      <div className="details-page">
        <h2 className="list-header">User Profile</h2>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Age: {age}</p>
        <p>Height: {height}''</p>
        <p>Height: {weight} lbs</p>
      </div>
      <hr className="breakline"/>
      <div>
        <WorkoutList />
      </div>
      <hr className="breakline" />
      <div>
        <NewWorkoutForm />
      </div>
    </div>
  );
}
export default UserProfile;