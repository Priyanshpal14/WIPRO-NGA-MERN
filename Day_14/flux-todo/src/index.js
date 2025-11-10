// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // optional - keep if you want default styles

const root = createRoot(document.getElementById("root"));
root.render(<App />);
