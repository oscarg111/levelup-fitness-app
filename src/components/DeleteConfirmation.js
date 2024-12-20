import React, { useState } from "react";

const DeleteConfirmation = ({ onDelete, onCancel }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };
  const handleConfirmClick = () => {
    onDelete(); 
    setShowConfirmation(false);
  };
  const handleCancelClick = () => {
    setShowConfirmation(false);
    if (onCancel) {
      onCancel();  
    }
  };
  return (
    <div>
      {/* If confirmation is not shown, display delete button */}
      {!showConfirmation ? (
        <div>
          <button onClick={handleDeleteClick}>Delete Item</button>
        </div>
      ) : (

        <div>
          <h1>Are you sure you want to delete this item?</h1>
          <button onClick={handleConfirmClick}>Yes, Delete</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default DeleteConfirmation;
