import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/danny_picture.png";
import Particle from "../Particle";
// import Type from "./Type";
import WeatherCard from "./WeatherCard";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <WeatherCard />
        </Container>
      </Container>
    </section>
  );
}

export default Home;
