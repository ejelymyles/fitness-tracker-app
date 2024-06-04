import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { MyProvider } from "./components/MyContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Router>
            <MyProvider>
                <App />
            </MyProvider>
        </Router>
    </React.StrictMode>
);
