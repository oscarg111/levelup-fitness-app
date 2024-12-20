// Home.js
import React, { useContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import "./CreateWorkout.css";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import trashIcon from "../assets/trash-icon.webp";

const CreateWorkout = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [heroData, setHeroData] = useState(null);
  const [workoutList, setWorkoutList] = useState([]);
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [description, setDescription] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [units, setUnits] = useState("lbs");
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isValid, setIsValid] = useState(false); // Valid selection flag
  const [validSubmission, setValidSubmission] = useState(true);
  const [isListVisible, setIsListVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // get user/hero data
  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
        .then((response) => {
          console.log(response.status);
          if (response.status === 500) {
            throw new Error("Server error");
          }
          return response.json();
        })
        .then((data) => {
          setUsername(data.username);
        })
        .catch((error) => console.error("Error fetching user data:", error))
        .finally();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // get workouts data
  useEffect(() => {
    try {
      fetch(
        "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
      )
        .then((response) => response.json())
        .then((data) => {
          const names = data
            .map((item) => item.name)
            .filter((name) => typeof name === "string"); // Filter out invalid names
          setExercises(names);
        })
        .catch((error) => console.error("Error fetching exercises:", error))
        .finally();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearchDebounced = useCallback(
    debounce((value) => {
      console.log(value);
      if (value && Array.isArray(exercises)) {
        const filtered = exercises
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
    [exercises]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setIsListVisible(true);
    setSearchTerm(value);
    setExerciseName(value);
    setIsValid(false);
    if (value && typeof value === "string") handleSearchDebounced(value);
  };

  const handleAddWorkout = async (e) => {
    e.preventDefault();

    console.log(username);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/postWorkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          heroName: username,
          postContent: description,
          workout: workoutList,
        }),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
    if (response.status == 201) navigate("/feed");
    else {
      setValidSubmission(false);
      console.log(response.status);
      console.log("Unsuccessful post");
    }
    clearForm();
  };

  const handleAddExercise = (e) => {
    e.preventDefault();
    let currentWorkout = `${exerciseName}: ${sets}x${reps} at ${weight}${units}`;
    if (
      isValid &&
      sets &&
      reps &&
      weight &&
      !workoutList.includes(currentWorkout)
    ) {
      setWorkoutList([...workoutList, currentWorkout]);
      setValidSubmission(true);
      clearForm();
    } else {
      setValidSubmission(false);
    }
  };

  function clearForm() {
    // form.reset();
    setSearchTerm("");
    setExerciseName("");
    setSets("");
    setReps("");
    setWeight("");
    setFilteredExercises([]);
  }

  const handleRemoveExercise = (exerciseToRemove) => {
    const updatedExercises = workoutList.filter(
      (workout) => workout !== exerciseToRemove
    );
    setWorkoutList(updatedExercises);
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option); // Set input value to the selected option
    setExerciseName(option);
    setValidSubmission(true);
    setFilteredExercises([]); // Clear suggestions
    setIsValid(true); // Mark as valid selection
    setIsListVisible(false);
  };

  if (loading) {
    console.log("loading", loading);
    return (
      <div className="create-workout-page">
        <div className="create-workout-container">
          <div>
            <p>Loading create workout...</p>
            <div className="loader"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!localStorage.getItem("authToken")) {
    console.log("not user");
    return (
      <>
        <Navbar />
        <div className="create-workout-page">
          <div className="create-workout-container container">
            <h1>Login to create workouts</h1>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>
      </>
    );
  }

  return username ? (
    <>
      <Navbar />

      <div className="create-workout-page">
        <div className="create-workout-container container">
          <h1 className="page-title">
            Make a workout for {username ? username : "Loading..."}
          </h1>
          <div className="create-workout-card">
            <div className="workout-form-container">
              <form onSubmit={handleAddWorkout} className="create-workout-form">
                <input
                  className="workout-description-input"
                  placeholder="Workout Description"
                  id="workoutDescription"
                  onChange={(e) => setDescription(e.target.value)}
                />{" "}
                {/*this is for the post content */}
                <input
                  className="exercise-search-input"
                  type="text"
                  id="exerciseName"
                  placeholder="Search Exercises..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                {isListVisible && searchTerm.length != 0 && (
                  <ul className="exercise-list">
                    {filteredExercises.map((exercise, index) => (
                      <li
                        key={index}
                        onClick={() => handleOptionClick(exercise)}
                        style={{ cursor: "pointer" }}
                      >
                        {exercise
                          .split(new RegExp(`(${searchTerm})`, "i"))
                          .map((part, i) =>
                            part.toLowerCase() === searchTerm.toLowerCase() ? (
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
                <div className="sets-rep-input">
                  <input
                    className="sets-input"
                    placeholder="Number of sets"
                    id="setCount"
                    type="number"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                  />
                  <input
                    className="rep-input"
                    placeholder="Number of reps"
                    id="repCount"
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                  />
                </div>
                <div className="weight-input">
                  <input
                    className="weightform-input"
                    placeholder="Weight"
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <select
                    className="unit-select"
                    id="units"
                    onChange={(e) => setUnits(e.target.value)}
                  >
                    <option>lbs</option>
                    <option>kgs</option>
                  </select>
                  <button
                    className="add-exercise-button"
                    onClick={handleAddExercise}
                  >
                    +
                  </button>
                </div>
                {!validSubmission && (
                  <p style={{ WebkitTextFillColor: "red" }}>
                    Please enter a valid submission
                  </p>
                )}
                <ul>
                  {workoutList.map((workout, index) => (
                    <div>
                      <li key={index}>{workout}</li>
                      <button onClick={() => handleRemoveExercise(workout)}>
                        -
                      </button>
                    </div>
                  ))}
                </ul>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="create-workout-page">
      <div className="create-workout-container container">
        <div>
          <p>Loading create workout...</p>
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkout;
