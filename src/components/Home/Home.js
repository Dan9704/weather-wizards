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
          <h1 className="heading-name">
              Weather Data of 
              <strong className="main-name"> Cerberus</strong> and <strong className="main-name">Melbourne Olympic Park</strong>
          </h1>
          <FruitPicker />
          <h1 className="heading-name">
              <strong className="main-name"> Climate Change</strong> on <strong className="main-name">Agriculture</strong> Data
          </h1>
          <ClimateCard />
        </Container>
      </Container>
    </section>
  );
}

export default Home;
