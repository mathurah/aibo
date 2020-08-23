import React from "react";
import "./App.css";
import logo from "./images/logo2.png";

const Navigate = () => {
  return (
    <div class="topnav">
      <div class="left">
        <a class="active" href="#home">
          <img src={logo} alt="Girl in a jacket" />
        </a>
        <a href="#news">Video Chat</a>
        <a href="#contact">Matches</a>
        <a href="#about">Dashboard</a>
        <a href="#about">Task Tracker</a>
      </div>
      <div class="right">
        <a class="login" href="#news">
          Log In
        </a>
        <a class="signup" href="#contact">
          <button class="buttonvibe">Try for free!</button>
        </a>
      </div>
    </div>
  );
};

export default Navigate;