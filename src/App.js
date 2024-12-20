// App.js
import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"; // Import routingcomponents
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/Landing";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import HeroPage from "./pages/Hero";
import LogInPage from "./pages/LogIn";
import SignUpPage from "./pages/SignUp";
import Feed from "./pages/Feed";
import CreateWorkout from "./pages/CreateWorkout";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import Leaderboard from "./pages/Leaderboard";
import HeroPath from "./pages/HeroPath";
const userLoggedIn = false;

const AnimatedRoutes = () => {
  const location = useLocation(); // Call useLocation inside the component

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key} // Unique key for each route change
        classNames="fade" // This should match the class name in your CSS
        timeout={500} // Duration of the transition in ms
      >
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-workout" element={<CreateWorkout />} />
          <Route path="/feed" element={<Feed userLoggedIn={userLoggedIn} />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/hero-path" element={<HeroPath />} />
          <Route path="/hero" element={<HeroPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AnimatedRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
