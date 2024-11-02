import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import WeatherCard from "./WeatherCard";
import ClimateCard from "./ClimateCard";

function Home() {
  const [temperature, setTemperature] = useState(null);

  const handleTemperatureChange = (temp) => {
    setTemperature(temp);
  };

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <h1 className="heading-name">
            Weather Data of 
            <strong className="main-name"> Cerberus</strong> and <strong className="main-name">Melbourne Olympic Park</strong>
          </h1>
          <WeatherCard onTemperatureChange={handleTemperatureChange} />
          <h1 className="heading-name">
            <strong className="main-name"> Climate Change</strong> on <strong className="main-name">Agriculture</strong> Data
          </h1>
          <ClimateCard temperature={temperature} />
        </Container>
      </Container>
    </section>
  );
}

export default Home;
