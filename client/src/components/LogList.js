import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogCard from "./LogCard";
import { MyContext } from "./MyContext";

function LogList({ logs, onDelete, onUpdate }) {

  return (
    <div>
        <ul className="log card-container">{logs.map((log) => <LogCard key={log.id} log={log} onDelete={onDelete} onUpdate={onUpdate}/>)}</ul>
    </div>
  );
}

export default LogList;