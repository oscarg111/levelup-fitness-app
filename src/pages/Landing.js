// Home.js
import React, { useContext, useEffect } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import LandingNav from "../components/Landing_nav";
import "./landing.css";
import sc1 from "../assets/screenshot_1.png";
import sc2 from "../assets/screenshot_2.png";
import sc3 from "../assets/screenshot_3.png";
import sc4 from "../assets/screenshot_4.png";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  useEffect(() => {
    let slideIndex = 0;
    let timeoutId;

    const showSlides = () => {
      const slides = document.getElementsByClassName("slide-show-img");

      // Hide all slides
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        if (!slides[i]) slides.style.display = "none";
      }

      // Show the next slide
      slideIndex++;
      if (slideIndex >= slides.length) slideIndex = 0;
      slides[slideIndex].style.display = "grid";

      // Schedule the next slide
      timeoutId = setTimeout(showSlides, 4000); // 5 seconds delay
    };

    showSlides();

    // Cleanup on component unmount to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="landing-pg">
      <Navbar />
      <div className="landing-container">
        <div className="left-column">
          <h1>It's time to LevelUp!</h1>
          <button className="signup-btn">
            <Link to="/signup">Get Started Here!</Link>
          </button>
        </div>
        <div className="right-column">
          <div className="image-container">
            <img className="slide-show-img fader" src={sc1} alt="image-1" />
          </div>
          <div className="image-container">
            <img className="slide-show-img fader" src={sc2} alt="image-2" />
          </div>
          <div className="image-container">
            <img className="slide-show-img fader" src={sc3} alt="image-3" />
          </div>
          <div className="image-container">
            <img className="slide-show-img fader" src={sc4} alt="image-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
