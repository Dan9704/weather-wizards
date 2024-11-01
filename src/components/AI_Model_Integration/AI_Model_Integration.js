import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";

function AI_Model_Intergration() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
      <label>
              Pick a fruit:
              <select name="selectedFruit">
                <option value="apple">Apple</option>
                <option value="banana">Banana</option>
                <option value="orange">Orange</option>
              </select>
            </label>
      </Container>
    </Container>
  );
}

export default AI_Model_Intergration;