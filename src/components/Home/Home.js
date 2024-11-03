import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle"; // Importing Particle component for background effect
import WeatherCard from "./WeatherCard"; // Importing WeatherCard component to display weather data
import ClimateCard from "./ClimateCard"; // Importing ClimateCard component to display climate data

// Home component serves as the main page to display weather and climate information
function Home() {
  // State to store the selected temperature, which will be passed to ClimateCard
  const [temperature, setTemperature] = useState(null);

  // Handler function to update the temperature state when it changes in WeatherCard
  const handleTemperatureChange = (temp) => {
    setTemperature(temp); // Sets the temperature to the value received from WeatherCard
  };

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle /> {/* Background particle effect for the home section */}
        
        <Container className="home-content">
          {/* Heading for the Weather Data section */}
          <h1 className="heading-name">
            Weather Data of 
            <strong className="main-name"> Cerberus</strong> and <strong className="main-name">Melbourne Olympic Park</strong>
          </h1>

          {/* WeatherCard component for displaying weather data */}
          {/* Passes handleTemperatureChange as a prop to update temperature when needed */}
          <WeatherCard onTemperatureChange={handleTemperatureChange} />

          {/* Heading for the Climate Change on Agriculture Data section */}
          <h1 className="heading-name">
            <strong className="main-name"> Climate Change</strong> on <strong className="main-name">Agriculture</strong> Data
          </h1>

          {/* ClimateCard component for displaying climate data related to agriculture */}
          {/* Passes the temperature state to ClimateCard to filter data based on selected temperature */}
          <ClimateCard temperature={temperature} />
        </Container>
      </Container>
    </section>
  );
}

export default Home; // Exporting Home component as the default export
