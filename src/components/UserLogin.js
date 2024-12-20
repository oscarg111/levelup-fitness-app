import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import DropdownAlert from "./Alert";
import hidePasswordImage from "../assets/hide_password.png";
import showPasswordImage from "../assets/view_password.png";
import "./UserLogin.css";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false); // useState for showing alert
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserSubmit = (e) => {
    e.preventDefault();

    // make call to backend to log user in
    // fetch(process.env.REACT_APP_URL);
    console.log(username, password);
    fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successful login: ", data);
        console.log(data.token === 200);
        if (data.token) {
          login(data);
          navigate("/hero");
          // trigger alert
        } else {
          console.log("Handling show alert");
          setShowAlert(true);
        }
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
    <div className=" login-card">
      <h1>Login</h1>
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
        <button type="submit">Log In</button>
      </form>
      <hr />
      <p className="alr-account">Don't have an account?</p>
      <button>
        <Link to="/signup">Sign Up!</Link>
      </button>
      {showAlert && <DropdownAlert message={"Login Failed"} />}
    </div>
  );
};

export default UserLogin;
