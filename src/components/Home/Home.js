import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
// import Type from "./Type";
import WeatherCard from "./WeatherCard";
import FruitPicker from "./WeatherCard";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          {/* <WeatherCard /> */}
          <FruitPicker />
        </Container>
      </Container>
    </section>
  );
}

export default Home;
