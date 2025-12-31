import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Avatar } from "rsuite";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const feedback = [
  {
    id: "feedback-1",
    content:
      "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
    name: "Herman Jensen",
    title: "Founder & Leader",
    img: "https://i.imgur.com/Dn0qoCG.png",
  },
  {
    id: "feedback-2",
    content:
      "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    title: "Founder & Leader",
    img: "https://i.imgur.com/fk8eEvW.png",
  },
  {
    id: "feedback-3",
    content:
      "It is usually people in the money business, finance, and international trade that are really rich.",
    name: "Kenn Gallagher",
    title: "Founder & Leader",
    img: "https://i.imgur.com/dLxxRDy.png",
  },
];

export const UserFeedback = () => {
  const [width, setWidth] = useState(window.innerWidth);
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={
        width <= "576px"
          ? "mobile"
          : width > "576px" && width <= "768px"
          ? "potrait phone"
          : width > "768px" && width <= "992px"
          ? "tablet"
          : width > "992px" && width <= "1200px"
          ? "desktop"
          : width > "1200px"
          ? "large desktop"
          : null
      }
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px mt-5 mb-5 ml-2"
    >
      {feedback &&
        feedback.map(({ id, content, name, title, img }) => (
          <Card
            className="row m-0"
            style={{ width: "30rem", height: "18rem" }}
            id={id}
          >
            <Card.Body className="row m-0">
              <img
                className="col-sm-5"
                src={img}
                style={{
                  height: "120",
                  width: "120",
                  border: "1px solid black",
                }}
              />
              <div className="col-sm-7">
                <Card.Title>
                  {title} -- {name}
                </Card.Title>
                <Card.Text>{content}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        ))}
    </Carousel>
  );
};
