import React from "react";
import Navbar from "../components/Navbar";
import "./Leaderboard.css";

const Leaderboard = () => {
  return (
    <div>
      <Navbar />
      <div className="leaderboard-content">
        {" "}
        <h1>This is the leaderboard</h1>
      </div>
    </div>
  );
};

export default Leaderboard;
