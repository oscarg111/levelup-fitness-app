// Home.js
import React from "react";
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div class="about-page">
      <Navbar />
      <div className="about-container">
        <div className="about-card">
          <h2>Welcome to the About Page</h2>
          <p>This is a fitness app</p>
          <p>Build your own hero</p>
        </div>
      </div>
    </div>
  );
};

export default About;
