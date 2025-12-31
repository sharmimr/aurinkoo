import React from "react";
import { useNavigate } from "react-router-dom";
import "./EdTech.css";
import { Foot } from "./Footer";

const EdTech = () => {

  const navigate = useNavigate();
    const handleClick = () => {
      navigate("/contactUs");
    };
  return (
    <div style={{ padding: "2rem" }} className="pageMargin">
      <div className="edtech-container m-0">
        <header className="edtech-header">
          <h1>Empower Your Learning Journey</h1>
          <p>Interactive courses, expert mentors, and hands-on projects</p>
          <button className="cta-button" onClick={handleClick}>
            Get Started
          </button>
        </header>

        <section className="features">
          <div className="feature-card">
            <img src="/assets/images/online-class.png" alt="Live Classes" />
            <h3>Live Classes</h3>
            <p>
              Join live sessions with industry experts and ask your questions in
              real-time.
            </p>
          </div>
          <div className="feature-card">
            <img src="/assets/images/project.png" alt="Hands-on Projects" />
            <h3>Hands-on Projects</h3>
            <p>
              Build real-world projects and strengthen your understanding
              through practice.
            </p>
          </div>
          <div className="feature-card">
            <img src="/assets/images/certificate.png" alt="Certifications" />
            <h3>Certified Courses</h3>
            <p>
              Get certificates on course completion to boost your resume and
              LinkedIn.
            </p>
          </div>
        </section>
      </div>
      <Foot />
    </div>
  );
};

export default EdTech;
