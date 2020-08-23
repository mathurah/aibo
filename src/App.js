import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import VideoChat from "./VideoChat";
import NavBar from "./NavBar";

const App = () => {
  return (
    <div className="app">
      <header>
        <NavBar />
      </header>
      <Container>
        <div class="vidchat">
          <VideoChat />
        </div>
      </Container>
      <footer>
        <p>
          Made with{" "}
          <span role="img" aria-label="React">
            ❤️
          </span>{" "}
          by{" "}
          <a href="https://devpost.com/"> Julia, Mathurah, Ayla and Shaahana</a>
        </p>
      </footer>
    </div>
  );
};

export default App;
