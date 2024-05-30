import React from "react";
import NavBar from "./NavBar";

function Header(){
    return (
        <div className="header">
            <h1 className="header-title">Welcome to Fit Fusion!</h1>
            <h4 className="header-subtitle">Find new movements, track your workouts, stay on top of your goals!</h4>
            <NavBar />
        </div>
    );
}

export default Header;