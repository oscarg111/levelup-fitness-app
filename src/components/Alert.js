import React, { useState } from "react";
import "../App.css"; // Optional: for custom styling

const DropdownAlert = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="dropdown-alert">
          <div className="alert-content">
            <p>{message}</p>
            <button className="close-button" onClick={handleClose}>
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DropdownAlert;
