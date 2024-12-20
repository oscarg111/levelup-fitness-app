import React, { useEffect } from "react";
import PRItem from "./PRItem";
import "./WorkoutStats.css";

const WorkoutStats = ({ workoutsCompleted, totalVolume, lifetimePRs }) => {
  useEffect(() => {
    console.log("being used");
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="workout-stats-page">
      <h1>Workout Stats</h1>
      <p>total workouts: {workoutsCompleted}</p>
      <p>total volume: {(totalVolume / 2000).toFixed(2)} tons</p>
      <p>list of lifetime PRs:</p>
      <div className="lifetime-prs">
        {lifetimePRs.length > 0
          ? lifetimePRs.map((workout) => (
              <PRItem
                exercise={workout.exercise}
                sets={workout.sets}
                reps={workout.reps}
                weight={workout.weight}
                hit_time={formatDate(workout.hit_time)}
              />
            ))
          : "No Lifetime PRs"}
      </div>
    </div>
  );
};

export default WorkoutStats;
