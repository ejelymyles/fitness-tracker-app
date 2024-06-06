import React from "react";
import NavBar from "./NavBar";

function Header(){
    return (
        <div className="header">
            <h1 className="header-title">Welcome to Fit Fusion!</h1>
            <h3 className="header-subtitle">Find new exercises, track your workouts, and stay on top of your goals!</h3>
            <NavBar />
        </div>
    );
}
export default Header;