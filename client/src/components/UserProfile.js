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
      <div className="user-profile-content">
        <h2 className="list-header">User Profile</h2>
        <p className="user-profile-text">Username: <span className="value">{username}</span> </p>
        <p className="user-profile-text">Email: <span className="value">{email}</span> </p>
        <p className="user-profile-text">Age: <span className="value">{age}</span> </p>
        <p className="user-profile-text">Height: <span className="value">{height} ''</span> </p>
        <p className="user-profile-text">Weight: <span className="value">{weight} lbs</span> </p>
      </div>
      <hr className="breakline"/>
      <div>
        <WorkoutList />
      </div>
      <div>
        <NewWorkoutForm />
      </div>
      <hr className="breakline" />
    </div>
  );
}
export default UserProfile;