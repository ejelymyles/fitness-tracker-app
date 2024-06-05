import React, { useContext } from "react";
import LogCard from "./LogCard";
import { MyContext } from "./MyContext";

function LogList() {
    const{ logs } = useContext(MyContext);

  return (
    <div>
        <ul className="log card-container">{logs.map((log) => <LogCard key={log.id} log={log} />)}</ul>
    </div>
  );
}
export default LogList;