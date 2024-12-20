// Navbar.js
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../App.css";
import { AuthContext } from "../contexts/AuthContext";
import "./LandingNav.css";

const LandingNav = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 500) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Getting user");
        setUser(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1 className="Logo">
          <a href="../">LevelUp Fitness</a>
        </h1>
      </div>
      <ul className="navbar-links">
        <li className="navbar-links">
          {user ? (
            <Link to="/hero">MyHero</Link>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </li>
        <li>{!user && <Link to="/signup">Sign Up</Link>}</li>
      </ul>
    </nav>
  );
};

// export default LandingNav;
