import React from "react";

const PRItem = ({ exercise, reps, sets, weight, hit_time }) => {
  return (
    <div>
      <h3>{exercise}</h3>
      <p>Sets: {sets}</p>
      <p>Reps: {reps}</p>
      <p>Weight: {weight}</p>
      <p>Hit on: {hit_time}</p>
    </div>
  );
};

export default PRItem;
