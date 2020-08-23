import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import VideoChat from "./VideoChat";
import Navigate from "./Navigate"
import vidimg from "./images/videochat.png";

const App = () => {
  return (
    <div className="app">
      <header>
      <Navigate/>
      </header>
      <Container>
        <Row>
          <Col>
            <div class="graphic">
              <img
                src={vidimg}
                alt="Girl in a jacket"
                width="400"
                height="400"
              />
            </div>
          </Col>
          <Col>
            <div class="vidchat">
              <VideoChat />
            </div>
          </Col>
        </Row>
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

