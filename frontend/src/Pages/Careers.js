import React, { useState } from "react";
import "./ApplicationForm.css";
import { Foot } from "./Footer";
import axios from "axios";

const Careers = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    resume: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(name, value, files);
    name === "resume" && setSelectedFile(e.target.files[0]);
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (!formData.resume) {
      newErrors.resume = "Resume upload is required.";
    }

    setErrors(newErrors);

    try {
      await axios.post(`/career-email`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Email sent successfully!");
      setError("");
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      setSuccess("");
    }
  };

  return (
    <div style={{ padding: "2rem" }} className="pageMargin">
      <div className="form-container">
        <h2>Looking for Growth? Connect with Us!</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>First Name</label>
            <input type="text" name="firstName" onChange={handleChange} />
            {errors.firstName && (
              <p className="error" style={{ color: "red" }}>
                {errors.firstName}
              </p>
            )}
          </div>
          <div className="form-row">
            <label>Last Name</label>
            <input type="text" name="lastName" onChange={handleChange} />
            {errors.lastName && (
              <p className="error" style={{ color: "red" }}>
                {errors.lastName}
              </p>
            )}
          </div>
          <div className="form-row">
            <label>Email ID</label>
            <input type="text" name="email" onChange={handleChange} />
            {errors.email && (
              <p className="error" style={{ color: "red" }}>
                {errors.email}
              </p>
            )}
          </div>
          <div className="form-row">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              pattern="[0-9]*"
              maxLength="10"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
            />
            {errors.phone && (
              <p className="error" style={{ color: "red" }}>
                {errors.phone}
              </p>
            )}
          </div>
          <div className="form-row">
            <label>Location</label>
            <input type="text" name="location" onChange={handleChange} />
            {errors.location && (
              <p className="error" style={{ color: "red" }}>
                {errors.location}
              </p>
            )}
          </div>
          <div className="form-row">
            <label>Resume</label>
            <label htmlFor="resumeUpload" className="file-label">
              Choose File
            </label>
            <input
              type="file"
              id="resumeUpload"
              name="resume"
              onChange={handleChange}
            />
            {selectedFile && <p className="file-name">{selectedFile.name}</p>}
            {errors.resume && (
              <p className="error" style={{ color: "red" }}>
                {errors.resume}
              </p>
            )}
          </div>
          {success && <p style={{ color: "darkGreen" }}>{success}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
      <Foot />
    </div>
  );
};

export default Careers;
