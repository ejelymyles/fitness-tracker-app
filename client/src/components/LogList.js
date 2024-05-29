import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogCard from "./LogCard";

function LogList() {
  const [logs, setLogs] = useState([]);
  const { user_id, workout_id } = useParams();

  useEffect(() => {
    fetch(`/users/${user_id}/workouts/${workout_id}/logs`)
      .then((r) => r.json())
      .then((logs) => {
        setLogs(logs);
      });
  }, [user_id, workout_id]);

  return (
    <div>
        <ul className="log card-container">{logs.map((log) => <LogCard key={log.id} log={log}/>)}</ul>
    </div>
  );
}

export default LogList;