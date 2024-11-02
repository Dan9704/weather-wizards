import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
// import Type from "./Type";
import FruitPicker from "./WeatherCard";
import ClimateCard from "./ClimateCard";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          {/* <WeatherCard /> */}
          <FruitPicker />
          <h1>Climate Change Agriculture Data</h1>
          <ClimateCard />
        </Container>
      </Container>
    </section>
  );
}

export default Home;
