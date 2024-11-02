import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import homeLogo from "../../Assets/danny_picture.png";
import ren from "../../Assets/ren.jpg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function About() {
  return (
    <Container fluid className="about-section">
      {/* Particle background effect  */}
      <Particle />
      <Container>
        {/* ---------------------------------------------- */}
        {/* ------------------Danny---------------------------- */}
        {/* ---------------------------------------------- */}
        <Row>
          <Col md={7} className="home-header">
            <h1 style={{ paddingBottom: 15 }} className="heading">
              G'Day, Mate!{" "}
              <span className="kangaroo">🦘</span>
            </h1>

            <h1 className="heading-name">
              I'm
              <strong className="main-name"> Danny Nguyen</strong>
            </h1>

            <h3 className="heading-name">
              Student ID:
              <strong className="main-name"> 104357292</strong>
            </h3>

            {/* Social Media */}
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Dan9704"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.facebook.com/profile.php?id=100041760740329"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillFacebook />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/duong-danny-nguyen/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/_tnug_dnoug_/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>

          <Col md={5} style={{ paddingBottom: 20 }}>
            <Tilt>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Tilt>
          </Col>
          
        </Row>

        {/* ---------------------------------------------- */}
        {/* ------------------Ren---------------------------- */}
        {/* ---------------------------------------------- */}
        <Row>
          <Col md={7} className="home-header">
          <h1 style={{ paddingBottom: 15 }} className="heading">
            Hello sunshine!{" "}
            <span className="kangaroo">🌞</span>
          </h1>

            <h1 className="heading-name">
              I'm
              <strong className="main-name"> Rehnuma Rahmat Ullah</strong>
            </h1>
            <h3 className="heading-name">
              Student ID:
              <strong className="main-name"> 104313715 </strong>
            </h3>

            {/* Social Media */}
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Dan9704"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.facebook.com/profile.php?id=100041760740329"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillFacebook />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/duong-danny-nguyen/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/_tnug_dnoug_/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>

          <Col md={5} style={{ paddingBottom: 20 }}>
            <Tilt>
              <img
                src={ren}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px", borderRadius: "50%" }}
              />
            </Tilt>
          </Col>
        </Row>
        {/* ---------------------------------------------- */}
        {/* ------------------Lehan---------------------------- */}
        {/* ---------------------------------------------- */}
        <Row>
          <Col md={7} className="home-header">
          <h1 style={{ paddingBottom: 15 }} className="heading">
            G'Day, Guys!{" "}
            <span className="kangaroo">🦘</span>
          </h1>

            <h1 className="heading-name">
              I'm
              <strong className="main-name"> Lehan Alagedara</strong>
            </h1>
            <h3 className="heading-name">
              Student ID:
              <strong className="main-name"> 104855055</strong>
            </h3>

            {/* Social Media */}
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Dan9704"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.facebook.com/profile.php?id=100041760740329"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillFacebook />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/duong-danny-nguyen/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/_tnug_dnoug_/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>

          <Col md={5} style={{ paddingBottom: 20 }}>
            <Tilt>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;
