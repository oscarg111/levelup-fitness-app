import React, { useState, useEffect, useContext } from "react";
import "./herocard.css";
import barbarian from "../assets/hero_barbarian.png";
import barbarianAssassin from "../assets/hero_barbarianAssassin.png";
import boxer from "../assets/hero_boxer.png";
import heavyKnight from "../assets/hero_heavyKnight.png";
import knight from "../assets/hero_knight.png";
import ninja from "../assets/hero_ninja.png";
import smallKnight from "../assets/hero_smallKnight.png";
import sumo from "../assets/hero_sumo.png";
import valkyrie from "../assets/hero_valkyrie.png";
import viking from "../assets/hero_viking.png";
import warrior from "../assets/hero_warrior.png";
import wrestler from "../assets/hero_wrestler.png";

// Map hero names to their corresponding images
const heroImages = {
  barbarian,
  barbarianAssassin,
  boxer,
  heavyKnight,
  knight,
  ninja,
  smallKnight,
  sumo,
  valkyrie,
  viking,
  warrior,
  wrestler,
};

const HeroCard = ({ hero }) => {
  // name, health, maxHealth, attack, defense
  let name = hero.name;
  let health = hero.stats.health;
  let maxHealth = hero.stats.health;
  let percentAttack = (hero.stats.attack / 310) * 100;
  let attack = hero.stats.attack;
  let percentDefense = (hero.stats.defense / 330) * 100;
  let defense = hero.stats.defense;

  const [displayedHealth, setDisplayedHealth] = useState(0); // use state for displayed health
  const [displayedAttack, setDisplayedAttack] = useState(0); // use state for displayed attack
  const [displayedDefense, setDisplayedDefense] = useState(0); // use state for displayed defense
  const healthPercentage = (health / maxHealth) * 100;

  const heroImage = heroImages[name]; // Dynamically fetch the image based on heroName

  // use effect for health
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedHealth(healthPercentage);
    }, 100);
    return () => clearTimeout(timeout);
  }, [healthPercentage]);

  // use effect for attack
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedAttack(percentAttack);
    }, 100);
    return () => clearTimeout(timeout);
  }, [attack]);

  // use effect for defense
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayedDefense(percentDefense);
    }, 100);
    return () => clearTimeout(timeout);
  }, [defense]);

  return (
    <div className="hero-container">
      {heroImage ? (
        <div className="hero-image">
          <img className="heroImage" src={heroImage} alt={name} />
        </div>
      ) : (
        <p>Image not found for {name}</p>
      )}
      <div class="hero-stats-card">
        <h2>{hero ? hero.name : "Loading..."}</h2>
        <p>
          Health: {health} / {maxHealth}
        </p>
        <div className="stat-bar">
          <div
            className="stat-bar-fill"
            style={{ width: `${displayedHealth}%`, backgroundColor: `#3bde5a` }}
          ></div>
        </div>
        <p>Attack: {attack}</p>
        <div className="stat-bar">
          <div
            className="stat-bar-fill"
            style={{ width: `${displayedAttack}%`, backgroundColor: `#f72323` }}
          ></div>
        </div>
        <p>defense: {defense}</p>
        <div className="stat-bar">
          <div
            className="stat-bar-fill"
            style={{
              width: `${displayedDefense}%`,
              backgroundColor: `#2353d4`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
