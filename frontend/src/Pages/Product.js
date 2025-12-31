import CommonAccordion from "./CommonAccordian";
import { Foot } from "./Footer";
import ProductTop from "./SamplePage";

const Product = () => {
  const accordionData = [
    {
      id: 0,
      title: "Frontend development",
      content: `We build responsive, user-friendly interfaces that look great and perform flawlessly across devices. Our frontend solutions combine modern frameworks like React, Vue, and Angular with pixel-perfect design implementation to ensure fast, accessible, and scalable web experiences.`,
      imgSrc: "/assets/images/fe.png",
      shape: "circle",
    },
    {
      id: 1,
      title: "Backend development/Support",
      content: `We build secure, scalable REST APIs that connect systems, apps, and data effortlessly. Our APIs are designed for performance, reliability, and integration`,
      imgSrc: "/assets/images/api.png",
      shape: "rounded-square",
    },
    {
      id: 2,
      title: "Data Analytics",
      content: `We transform raw data into actionable insights through advanced analytics and visualization. Our solutions help you uncover trends, optimize performance, and drive smarter decisions.`,
      imgSrc: "/assets/images/data_analytics.png",
      shape: "rounded-top",
    },
    {
      id: 3,
      title: "QA & Testing",
      content: `Ensure flawless performance, security, and user experience. Our end-to-end application testing services help identify bugs, improve functionality, and deliver high-quality software with confidence.`,
      imgSrc: "/assets/images/testing.png",
      shape: "two-values",
    },
  ];
  return (
    <div style={{ padding: "2rem" }} className="pageMargin">
      <ProductTop page="Product" />
      <CommonAccordion title={"Services"} accordionData={accordionData} />
      <Foot />
    </div>
  );
};

export default Product;
