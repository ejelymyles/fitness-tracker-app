import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WorkoutList from "./WorkoutList";
import NewWorkoutForm from "./NewWorkoutForm";

function UserProfile() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/users/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
      });
  }, [id]);


  if (!user) {
    return <div>Loading...</div>;
  }

  const { username, email, age, height, weight } = user;

  return (
    <div>
      <div className="details-page">
        <h2 className="full-list-header">User Profile</h2>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Age: {age}</p>
        <p>Height: {height}''</p>
        <p>Height: {weight} lbs</p>
      </div>
      <hr />
      <div>
        <WorkoutList />
      </div>
      <hr />
      <div>
        <NewWorkoutForm />
      </div>
    </div>
  );
}

export default UserProfile;