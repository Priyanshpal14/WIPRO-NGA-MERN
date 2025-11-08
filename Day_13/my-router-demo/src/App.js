import logo from './logo.svg';
import './App.css';
// src/App.js
// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import ContactUs from "./pages/contactus";
import User from "./pages/user";
import NotFound from "./pages/notfound";

function App() {
  return (
    <Router>
      <nav style={{ textAlign: "center", margin: "20px" }}>
        <NavLink to="/" style={{ margin: "10px" }}>Home</NavLink>
        <NavLink to="/about" style={{ margin: "10px" }}>About</NavLink>
        <NavLink to="/contact" style={{ margin: "10px" }}>Contact</NavLink>
        <NavLink to="/user" style={{ margin: "10px" }}>User</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
