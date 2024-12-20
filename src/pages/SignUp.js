import React from "react";
import UserSignup from "../components/UserSignup";
import "./Signup.css";
import Navbar from "../components/Navbar";

let SignUpPage = () => {
  return (
    <div>
      <Navbar />
      <div class="signup-page">
        <UserSignup />
      </div>
    </div>
  );
};

export default SignUpPage;
