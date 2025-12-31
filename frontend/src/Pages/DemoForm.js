import React, { useState } from "react";
import "./ApplicationForm.css";
import { Foot } from "./Footer";
import axios from "axios";
import "./Form.css";
import Form from "react-bootstrap/Form";
import SamplePageFive from "./SamplePageFive";
import { FloatingLabel, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";

const DemoForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    comments: "",
    enquiryType: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    setErrors(newErrors);
    try {
      await axios.post("http://localhost:5050/send-email", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setSuccess("Email sent successfully!");
      setErrors({});
      setFormData({});
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <Form className="form-inline rounded-div m-5" onSubmit={handleSubmit}>
      <Row class="g-2">
        <Col md>
          <FloatingLabel
            controlId="floatingTextarea"
            label="First Name"
            className="m-2 formFirst"
            for="firstName"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              onChange={handleChange}
              name="firstName"
            />
          </FloatingLabel>
          {}
        </Col>
        <Col md>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Last Name"
            className="m-2"
            for="lastName"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              onChange={handleChange}
              name="lastName"
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col md>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Email"
            className="m-2"
            for="email"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              onChange={handleChange}
              name="email"
            />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Phone"
            className="m-2"
            for="phone"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              onChange={handleChange}
              name="phone"
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col md>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Company"
            className="m-2"
            for="company"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              onChange={handleChange}
              name="company"
            />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Enquiry Type"
            className="m-2"
            for="enquiryType"
          >
            <Form.Select
              aria-label="Select Enquiry Type"
              onChange={handleChange}
              name="enquiryType"
            >
              <option value="Request Demo">Request Demo</option>
              <option value="Product Enquiry">Product Enquiry</option>
              <option value="General Enquiry">General Enquiry</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Comment"
        className="m-2 p-10"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px", border: "0px" }}
          onChange={handleChange}
          name="comments"
        />
      </FloatingLabel>
      {success && (
        <p style={{ color: "darkGreen", margin: "5px" }}>{success}</p>
      )}
      {errors &&
        Object.values(errors).map((err) => (
          <p style={{ color: "red", margin: "5px" }}>{err}</p>
        ))}
      {error && <p style={{ color: "red", margin: "5px" }}>{error}</p>}
      <div className="text-center p-3">
        <button type="submit" class=" btn btn-get button-common-style">
          <span> Submit Now!</span>
        </button>
      </div>
    </Form>
  );
};

export default DemoForm;
