import React, { useState, useEffect, useCallback } from "react";
import "./UpdatePost.css";
import "./PostPopup.css";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

const UpdatePost = ({ isOpen, post, onClose, onUpdate }) => {
  const [description, setDescription] = useState(post.postContent || "");
  const [workoutList, setWorkoutList] = useState(post.workout || []);
  const [editIndex, setEditIndex] = useState(null);
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [units, setUnits] = useState("lbs");
  const [exerciseSuperList, setExerciseSuperList] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [isListVisible, setIsListVisible] = useState(false);
  const [validSubmission, setValidSubmission] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const names = data
          .map((item) => item.name)
          .filter((name) => typeof name === "string"); // Filter out invalid names
        setExerciseSuperList(names);
      })
      .catch((error) => console.error("Error fetching exercises:", error));
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll"); // Disable scrolling
    } else {
      document.body.classList.remove("no-scroll"); // Enable scrolling
    }

    // Cleanup function to remove class on unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearchDebounced = useCallback(
    debounce((value) => {
      if (value && Array.isArray(exerciseSuperList)) {
        const filtered = exerciseSuperList
          .filter((exercise) =>
            exercise.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 50);

        setFilteredExercises(filtered);
        console.log(filtered);
      } else {
        setFilteredExercises([]);
      }
    }, 300),
    [exerciseSuperList]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setIsListVisible(true);
    setExerciseName(value);
    setIsValid(false);
    if (value && typeof value === "string") handleSearchDebounced(value);
  };

  // Fill the form for editing a specific exercise
  const handleEditExercise = (index) => {
    const [name, setsRepsWeight] = workoutList[index].split(": ");
    const [setsReps, weightUnits] = setsRepsWeight.split(" at ");
    const [sets, reps] = setsReps.split("x");
    const [weight, units] = weightUnits.split(/(lbs|kgs)/);

    setEditIndex(index);
    setExerciseName(name.trim());
    setSets(sets.trim());
    setReps(reps.trim());
    setWeight(weight.trim());
    setUnits(units.trim());
  };

  // Save changes to the edited exercise
  const handleSaveExercise = () => {
    const updatedExercise = `${exerciseName}: ${sets}x${reps} at ${weight}${units}`;
    const updatedWorkoutList = [...workoutList];
    if (editIndex !== null) {
      updatedWorkoutList[editIndex] = updatedExercise;
    } else {
      updatedWorkoutList.push(updatedExercise);
    }

    setWorkoutList(updatedWorkoutList);
    clearExerciseFields();
  };

  // Remove an exercise from the workout
  const handleDeleteExercise = (index) => {
    const updatedWorkoutList = workoutList.filter((_, i) => i !== index);
    setWorkoutList(updatedWorkoutList);
  };

  // Clear input fields after saving or canceling
  const clearExerciseFields = () => {
    setExerciseName("");
    setSets("");
    setReps("");
    setWeight("");
    setUnits("lbs");
    setEditIndex(null);
  };

  const handleOptionClick = (option) => {
    setExerciseName(option);
    setValidSubmission(true);
    setFilteredExercises([]); // Clear suggestions
    setIsValid(true); // Mark as valid selection
    setIsListVisible(false);
  };

  // Submit the updated post to the backend
  const handleUpdatePost = () => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/updateWorkout/${post._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: post.userName,
        heroName: post.heroName,
        postContent: description,
        workout: workoutList,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        onUpdate(data); // Notify parent about the update
        onClose(); // Close the modal
      })
      .catch((error) => console.error("Error updating post:", error));
    navigate("/feed");

    console.log(post);
    console.log(description);
    console.log(workoutList);
  };

  return ReactDOM.createPortal(
    <div className="post-popup">
      <div className="popup-content">
        <button className="popup-close-button" onClick={onClose}>
          x
        </button>
        <h2>Update Workout</h2>
        <form>
          <p>Workout Description</p>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <h3>Exercises</h3>
          {workoutList.map((exercise, index) => (
            <div key={index} className="exercise-item">
              <span>{exercise}</span>
              <button type="button" onClick={() => handleEditExercise(index)}>
                Edit
              </button>
              <button type="button" onClick={() => handleDeleteExercise(index)}>
                Delete
              </button>
            </div>
          ))}

          <div className="exercise-form">
            <p>Exercise Name:</p>
            <input value={exerciseName} onChange={handleSearch} />
            {isListVisible && (
              <ul className="exercise-list">
                {filteredExercises.map((exercise, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClick(exercise)}
                    style={{ cursor: "pointer" }}
                  >
                    {exercise
                      .split(new RegExp(`(${exerciseName})`, "i"))
                      .map((part, i) =>
                        part.toLowerCase() === exerciseName.toLowerCase() ? (
                          <span key={i} style={{ fontWeight: "bold" }}>
                            {part}
                          </span>
                        ) : (
                          part
                        )
                      )}
                  </li>
                ))}
              </ul>
            )}
            <p>Number of Sets:</p>
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
            <p>Number of Reps:</p>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
            <p>Weight:</p>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <select value={units} onChange={(e) => setUnits(e.target.value)}>
              <option>lbs</option>
              <option>kgs</option>
            </select>
            <button type="button" onClick={handleSaveExercise}>
              {editIndex !== null ? "Save" : "Add"}
            </button>
          </div>
        </form>
        <button className="update-btn" onClick={handleUpdatePost}>
          Update Post
        </button>
      </div>
    </div>,
    document.body
  );
};

export default UpdatePost;
