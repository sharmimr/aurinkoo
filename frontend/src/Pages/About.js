import AboutIllustration from "./AboutIllustration";
import Image from "react-bootstrap/Image";
import {useRef, useEffect} from 'react'
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Foot } from "./Footer";
import { Card, Container } from "react-bootstrap";
import SamplePageTwo from "./SamplePageTwo";

function About() {
  return (
    <div style={{ padding: "2rem" }} className="pageMargin">
      {/* Background Canvas */}
      <div className="position-relative text-center" style={{ width: "100%" }}>
        <Image
          src="/assets/images/about_img.jpg"
          width="100%"
          height="700px"
          className="w-100"
          style={{ objectFit: "cover" }}
        />

        {/* Optional overlay background */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1 }}
        />

        {/* Centered Text */}
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{ zIndex: 2 }}
        >
          <h1
            style={{
              color: "red",
              fontWeight: "bold",
              textShadow: "2px 2px 5px black",
            }}
          >
            ABOUT US
          </h1>
        </div>
      </div>
      <Container
        style={{ marginTop: "5rem" }}
        className="d-flex align-items-center slide-in-container"
      >
        <Image
          src="/assets/images/aboutus.jpg"
          width="40%"
          height="300px"
          className="slide-left me-4"
          style={{ width: "60%", margin: "10px", borderRadius: '25px' }}
        />
        <div>
          <p>
            We are a team of passionate tech professionals committed to
            delivering high-quality digital solutions. From development to
            deployment, our focus is on innovation, reliability, and customer
            satisfaction.
          </p>
          <p>
            Driven by creativity and powered by technology, we build smart
            solutions that solve real-world problems. At the heart of our
            journey is a commitment to quality, agility, and impact.
          </p>
          <p>
            At our core, we believe in simplifying technology for our clients.
            With a blend of experience and innovation, we deliver tailored
            services that drive business success.
          </p>
        </div>
      </Container>
      <AboutIllustration />
      <Foot />
    </div>
  );
}

export default About;
