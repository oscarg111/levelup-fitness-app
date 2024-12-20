import React from "react";
import Navbar from "../components/Navbar";
import "./HeroPath.css";

const HeroPath = () => {
  return (
    <div>
      <Navbar />
      <div className="hero-path-page">
        <h1>This is the hero path page</h1>
        <p>Here you will see potential heroes you can acquire for your quest</p>
      </div>
    </div>
  );
};

export default HeroPath;
