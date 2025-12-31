import Form from "react-bootstrap/Form";
import SamplePageFive from "./SamplePageFive";
import { FloatingLabel, Row } from "react-bootstrap";
import { Foot } from "./Footer";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import axios from "axios";
import DemoForm from "./DemoForm";

function TextControlsExample() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: "",
    lastName: "",
    phone: "",
    company: "",
    enquiryType: "",
    comment: "",
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    return newErrors;
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      setSuccess("");
      return;
    }

    setError({});
    try {
      await axios.post("http://localhost:5050/send-email", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setSuccess("Email sent successfully!");
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "2rem" }} className="pageMargin position-relative">
      <h1
        style={{
          position: "absolute",
          top: "10%",
          left: "43%",
          color: "#f4b8a3",
        }}
      >
        Reach Out To Us
      </h1>
      <svg
        width="100%"
        height="300px"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          class="curve"
          stroke="#2A4F46"
          fill="none"
          fill-rule="evenodd"
          transform="translate(0,90)"
        >
          <path
            id="glowPath"
            d="M 0, 60 S 300, -60, 600, 60, 800, -120, 1200 60"
          />
          <path d="M 0, 60 S 200, -60, 400, 60, 900, -120, 1200 60" />
          <path d="M 0, 60 S 200, -70, 400, 70, 800, -120, 1200 60" />
          <path d="M 0, 60 S 200, -60, 400, 80, 600, -120, 1200 60" />
          <path d="M 0, 60 S 300, -60, 600, 60, 800, -120, 1200 60" />
          <path d="M 0, 60 S 200, -70, 400, 60, 800, -120, 1200 60" />
        </g>
        <circle id="glow" r="6" cx="0" cy="90" fill="#000"></circle>
        <animateMotion
          xlinkHref="#glow"
          dur="6s"
          begin="1.2s"
          repeatCount="indefinite"
        >
          <mpath xlinkHref="#glowPath" />
        </animateMotion>
      </svg>
      <div className="row col-offset-2 m-3 p-2">
        <SamplePageFive />
        <div className="col-xs-5 col-lg-4">
          <DemoForm />
        </div>
        <Foot />
      </div>
    </div>
  );
}

export default TextControlsExample;
