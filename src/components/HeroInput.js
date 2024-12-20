import React, { useEffect, useState } from "react";
import "./heroInput.css";
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

const HeroInput = ({
  heroName,
  onAddHero,
  userVolume,
  unlockWeight,
  userHeroes,
}) => {
  const heroImage = heroImages[heroName]; // Dynamically fetch the image based on heroName
  const [formattedHeroName, setFormattedHeroName] = useState("");
  const [heroNames, setHeroNames] = useState([]);

  useEffect(() => {
    let tempName = heroName
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Split camel case into words
      .split(" ") // Split into an array of words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1)) // Capitalize each word
      .join(" "); // Join the words back together
    setFormattedHeroName(tempName);

    const formattedHeroNames = userHeroes.map((hero) => hero.name);
    console.log(formattedHeroNames);
    setHeroNames(formattedHeroNames);
    console.log(heroNames);
  }, []);

  return (
    <div>
      <h1>Hero: {formattedHeroName}</h1>
      <br />
      {heroImage ? (
        <img className="heroImage" src={heroImage} alt={heroName} />
      ) : (
        <p>Image not found for {heroName}</p>
      )}
      <br />
      {heroNames.includes(heroName) ? (
        <p>Hero already owned</p>
      ) : (
        <button
          id={heroName}
          onClick={onAddHero}
          disabled={
            (userVolume / 2000).toFixed(2) < unlockWeight ? "true" : false
          }
        >
          Add {formattedHeroName}
        </button>
      )}
      <p>Unlock Weight: {unlockWeight} tons</p>
      <hr />
    </div>
  );
};

export default HeroInput;
