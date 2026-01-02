require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");

const app = express();

// ======== MIDDLEWARES ========
app.use(
  cors({
    origin: ["http://localhost:3000", "https://aurinkoo.vercel.app"], // Frontend origins
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.options("*", cors());
app.use(express.json()); // Parse JSON bodies

// Multer for file uploads (memory storage like Flask)
const upload = multer({ storage: multer.memoryStorage() });

// ======== NODEMAILER TRANSPORTER ========
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password
  },
});

// Verify transporter connection (optional)
transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP connection error:", err);
  } else {
    console.log("SMTP transporter ready");
  }
});

// ======== 1. General Form Submission Route ========
app.post("/send-email", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    company,
    enquiryType,
    comments,
    message, // optional extra
  } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !phone || !company) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Admin inbox
      subject: `New Form Submission from ${firstName} ${lastName}`,
      text: `
New form submission:

First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone: ${phone}
Company: ${company}
Enquiry Type: ${enquiryType}
Comment: ${comments}
Message: ${message || ""}
      `,
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ======== 2. Career Application Route (with resume attachment) ========
app.post("/career-email", upload.single("resume"), async (req, res) => {
  try {
    const { firstName, lastName, email, phone, location } = req.body;
    const resume = req.file;

    if (!firstName || !lastName || !email || !phone || !location || !resume) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Admin inbox
      subject: `New Career Application: ${firstName} ${lastName}`,
      text: `
New career application received:

First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone: ${phone}
Location: ${location}
      `,
      attachments: [
        {
          filename: resume.originalname,
          content: resume.buffer,
          contentType: resume.mimetype,
        },
      ],
    });

    res
      .status(200)
      .json({ success: true, message: "Career email sent successfully" });
  } catch (err) {
    console.error("CAREER EMAIL ERROR:", err);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// ======== START SERVER ========
const PORT = process.env.PORT || 5050; // Use safe port to avoid macOS conflicts
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
