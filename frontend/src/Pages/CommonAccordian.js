import React, { useEffect, useState, useRef } from "react";
import { Accordion } from "react-bootstrap";

const CommonAccordion = (props) => {
  const { title, accordionData } = props;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    // subscribe event
    window.addEventListener(
      "resize",
      () => {
        setIsMobile(window.innerWidth < 992);
      },
      false
    );
  }, []);

  return (
    <div className="row pt-5 pb-5 row  col-xs-9 offset-md-4 col-md-7 rounded benefits position-relative">
      <div className="benefitsBackground"></div>
      <h2 className="col-offset-3 text-success d-flex justify-content-middle">
        {title}
      </h2>
      <div className="col-xs-12 d-flex justify-content-middle">
        <Accordion
          defaultActiveKey={0}
          className="col-xs-12 col-lg-7 p-3 position-relative"
        >
          {accordionData &&
            accordionData.map(
              ({ title, content, id, imgSrc, shape }) => (
                (
                  <Accordion.Item eventKey={id} className="mb-2 accordianItem">
                    <Accordion.Header>{title}</Accordion.Header>
                    <Accordion.Body>
                      <div className={`${isMobile && "col-xs-12"}`}>
                        {content}
                      </div>
                      <div
                        className={`${
                          !isMobile &&
                          "position-relative d-flex align-items-end top-5 start-100 translate-middle"
                        } imgContainer ${isMobile && "col-xs-12"}`}
                        width="500px"
                        height="30%"
                      >
                        <img
                          src={imgSrc}
                          style={{ height: "35vh", maxWidth: "100%" }}
                          className={` ${
                            !isMobile &&
                            "position-absolute top-50 start-100 align-items-end translate-middle"
                          } ${shape === "three-values" && "three-values"} ${
                            shape === "four-values" && "four-values"
                          } 
                           ${shape === "two-values" && "two-values"} ${
                            shape === "rounded-top" && "rounded-top"
                          } ${shape === "rounded-square" && "rounded-square"} ${
                            shape === "circle" && "circle"
                          } vw-100`}
                          alt='descImg'
                        />
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                )
              )
            )}
        </Accordion>
      </div>
    </div>
  );
};

export default CommonAccordion;
