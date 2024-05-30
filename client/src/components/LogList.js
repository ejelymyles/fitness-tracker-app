import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LogCard from "./LogCard";

function LogList({ logs, onDelete }) {

  return (
    <div>
        <ul className="log card-container">{logs.map((log) => <LogCard key={log.id} log={log} onDelete={onDelete}/>)}</ul>
    </div>
  );
}

export default LogList;