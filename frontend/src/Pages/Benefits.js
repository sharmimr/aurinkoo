import React from "react";
import CommonAccordion from "./CommonAccordian";

const Benefits = () => {
  const accordionData = [
    {
      id: 0,
      title: "Accelerate time to Insights",
      content: `Harness power of AI enabled on-demand platform to generate immediate insights`,
      imgSrc: "/assets/images/analytics.avif",
      shape: "circle",
    },
    {
      id: 1,
      title: "AI-powered insights",
      content: `Unleash the full potential of Generative AI by delivering accurate and curated real-world data insights`,
      imgSrc: "/assets/images/line of therapy.png",
      shape: "rounded-square",
    },
    {
      id: 2,
      title: "Data-neutral insights",
      content: `Eliminate reliance on data vendor-specific processes, enabling seamless data switching without compromising business intelligence`,
      imgSrc: "/assets/images/critical.png",
      shape: "rounded-top",
    },
    {
      id: 3,
      title: "Connected insights Journey",
      content: `Foster continuous learning and insights across key initiatives, seamlessly connecting patient journeys, targeting, and reporting`,
      imgSrc: "/assets/images/patientDemography.png",
      shape: "two-values",
    },
    {
      id: 4,
      title: "Centralized knowledge management",
      content: `Establish a single, unified view of all business rules across projects and timeframes, ensuring knowledge consistency and accessibility`,
      imgSrc: "/assets/images/physician.png",
      shape: "four-values",
    },
  ];
  return <CommonAccordion title={"Benefits"} accordionData={accordionData} />;
};

export default Benefits;
