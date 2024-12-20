import React, { useEffect, useState } from "react";
import "./AddHero.css";
import { useNavigate } from "react-router-dom";
import HeroInput from "./HeroInput";

const AddHero = ({ onClose, id_num, totalVolume, userHeroes }) => {
  const navigate = useNavigate();
  const [heroes, setHeroes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // get heroes
    const fetchHeroes = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/getHeroes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to get heroes");
        }

        const data = await response.json();
        setHeroes(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchHeroes();
  }, []);

  const addHeroFunc = (e) => {
    e.preventDefault();

    console.log(`adding hero ${e.target.id} hero`);

    // make call to backend to log user in
    fetch(`${process.env.REACT_APP_API_URL}/auth/addhero/${id_num}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.id,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));

    navigate("/hero");
  };

  return (
    <div className="post-popup">
      <div className="popup-content">
        <div>
          <button className="popup-close-button" onClick={onClose}>
            X
          </button>
          {heroes.length > 0 &&
            heroes.map((hero) => (
              <HeroInput
                heroName={hero.name}
                unlockWeight={hero.unlockWeight}
                onAddHero={addHeroFunc}
                userVolume={totalVolume}
                userHeroes={userHeroes}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddHero;
