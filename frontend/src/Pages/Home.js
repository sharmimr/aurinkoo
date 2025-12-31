import FluidImage from "./Image";
import { useState } from "react";
import ImageRight from "./ImageRight";
import Benefits from "./Benefits";
import { Foot } from "./Footer";
import { UserFeedback } from "./UserFeedback";
import AnimateHome from "./AnimateHome";
import { Container } from "react-bootstrap";

const Home = () => {
  const hover = (ele) => {
    console.log(ele, "ELE");
    ele.setAttribute("src", "http://dummyimage.com/100x100/eb00eb/fff");
  };
  const content1 = `Eliminate time wasted on data cleaning and contextualization with
        AI-powered analytics, accelerating path to actionable insights.
         Insightful reports instantly, allowing for real-time adjustments and
        agile action.`;
  const content2 = `Enable all stakeholders to interact with data intuitively, using plain English and dynamic summaries, regardless of technical expertise`;
  const content3 = `Data-Driven Storytelling: Craft compelling narratives around data, showcasing key insights and driving impactful decision-making.`;
  const content4 = `Leverage power of integrated RWD and sales/marketing data to gain a holistic understanding of your target audience and receive actionable recommendations`;

  const imgSrc1 = "/assets/images/ai-analytics.svg";
  const imgSrc2 = "/assets/images/analytics.avif";
  const imgSrc3 = "/assets/images/homeImage1.jpg";
  const imgSrc4 = "/assets/images/salesOptimize.png";
  const heading1 = "Empower Data-Driven Decisions";
  const heading2 = "Democratize Insights";
  const heading3 = "Amplify Storytelling";
  const heading4 = "Optimize Sales & Marketing";

  return (
    <Container fluid={true} className="m-0 p-0">
      <div style={{ padding: "2rem" }} className="pageMargin">
        <AnimateHome />
        <Foot />
      </div>
    </Container>
  );
};

export default Home;
