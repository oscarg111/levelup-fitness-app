import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./UserSignup.css";
import hidePasswordImage from "../assets/hide_password.png";
import showPasswordImage from "../assets/view_password.png";

const UserSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserSubmit = (e) => {
    e.preventDefault();

    // make call to backend to log user in
    // fetch(process.env.REACT_APP_URL);
    console.log(username, password);

    let postBody = {
      username: username,
      password: password,
    };

    console.log(JSON.stringify(postBody));

    fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successful login: ", data);
        console.log(data.token === 200);
        if (data.token) {
          login(data);
        }
        navigate("/login");
      })
      .catch((error) => console.error("Error:", error));
  };
  const handleClick = () => {
    togglePasswordVisbility();
    setPasswordShowing(!isPasswordShowing);
  }
  const togglePasswordVisbility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const [isPasswordShowing, setPasswordShowing] = useState(false)

  return (
    <div className="signup-card">
      <h1>SignUp</h1>
      <form className="form-container" onSubmit={handleUserSubmit}>
        <p>Username:</p>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>Password:</p>
        <div className="vis-btn-container">
          <button className="password-vis-btn" type="button" onClick={handleClick}>
            <img 
              className="password-icon" 
              src={isPasswordShowing ? hidePasswordImage : showPasswordImage} 
              alt="password vibility"/>
          </button>
        </div>
        <input
          type={passwordVisible ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <button type="submit">Sign Up</button>
      </form>
      <hr />
      <p className="alr-account">Already have an account?</p>
      <button>
        <Link to="/login">Log In!</Link>
      </button>
    </div>
  );
};

export default UserSignup;
