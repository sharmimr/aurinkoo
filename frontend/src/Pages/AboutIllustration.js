import React from "react";

const AboutIllustration = () => (
  <svg
    viewBox="0 0 600 200"
    width="100%"
    height="200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>
      {`
        .blink {
          animation: blink 1s step-start 0s infinite;
          fill:rgb(225, 140, 42);
          font: bold 32px sans-serif;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .highlight {
          fill:green;
          font: bold 18px sans-serif;
        }

        .desc {
          fill: #555;
          font: 14px sans-serif;
        }
      `}
    </style>
    <text x="50%" y="50" textAnchor="middle" className="blink">
      Why Choose Us?
    </text>
    <text x="50%" y="90" textAnchor="middle" className="highlight">
      ✔ Proven Expertise
    </text>
    <text x="50%" y="115" textAnchor="middle" className="highlight">
      ✔ Customizable IT solutions
    </text>
    <text x="50%" y="140" textAnchor="middle" className="highlight">
      ✔ Reliable technical assistance
    </text>
    <text x="50%" y="165" textAnchor="middle" className="highlight">
      ✔ Your tech partner with round-the-clock care
    </text>
  </svg>
);

export default AboutIllustration;
