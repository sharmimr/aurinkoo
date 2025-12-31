import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/system";
import HorizontalLayout from "./Graphic_HorizontalLayout";
import CircleComponent from "./Graphic_Circles";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Title = styled("div")({
  fontWeight: "900",
  fontSize: "40px",
  marginBottom: "20px",
  alignItems: "center",
  fontFamily: "'Poppins', sans-serif",
});

const Subtitle = styled("div")({
  fontWeight: "500",
  fontSize: "22px",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "1500px",
  marginBottom: "10px",
  fontFamily: "'Poppins', sans-serif",
});

const StepTitle = styled("div")({
  fontSize: "2.5em",
  alignItems: "center",
  justifyContent: "center",
  width: "600px",
  color: "#31a354",
  fontWeight: "900",
  fontSize: "28px",
  fontFamily: "'Poppins', sans-serif",
});

const StepSubtitle = styled("div")({
  fontSize: "1em",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "500",
  fontSize: "20px",
  fontFamily: "'Poppins', sans-serif",
});

function SamplePage({page}) {
  const navigate = useNavigate();

  const innerRef = useRef();
  const [activeCircle, setActiveCircle] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);

  const handleClick = () => {
    navigate("/contactUs");
  };
  useEffect(() => {
    const div = innerRef.current;
    // subscribe event
    window.addEventListener(
      "resize",
      () => {
        setIsMobile(window.innerWidth < 720);
      },
      false
    );
  }, []);

  const [openPatient, setOpenPatient] = useState(true);
  const [openPayer, setOpenPayer] = useState(false);
  const [openProvider, setOpenProvider] = useState(false);
  const [openPhysician, setOpenPhysician] = useState(false);

  const onShapeMouseOverEvent = (value) => {
    if (value == "Website Development") {
      setOpenPatient(true);
      changeActiveCircle(1);
      setOpenProvider(false);
      setOpenPayer(false);
      setOpenPhysician(false);
    } else if (value == "QA & Testing") {
      changeActiveCircle(4);
      setOpenPatient(false);
      setOpenProvider(true);
      setOpenPayer(false);
      setOpenPhysician(false);
    } else if (value == "API Management") {
      changeActiveCircle(3);
      setOpenPatient(false);
      setOpenProvider(false);
      setOpenPayer(true);
      setOpenPhysician(false);
    } else if (value == "Data Analytics & AI") {
      changeActiveCircle(2);
      setOpenPatient(false);
      setOpenProvider(false);
      setOpenPayer(false);
      setOpenPhysician(true);
    }
  };

  const handleMouseOutEvent = (value) => {
    // You can access 'value' here
    if (value === "PATIENT ANALYTICS") {
    } else if (value == "QA & Testing") {
    } else if (value == "API Management") {
    } else if (value == "Data Analytics & AI") {
    }
  };
  const changeActiveCircle = (newActiveCircle) => {
    setActiveCircle(newActiveCircle);
  };

  return (
    <div
      style={{
        margin: "0.5%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Title>
        <i>Tech Development & IT Support</i>
      </Title>
      <Subtitle>
        <i>
          Empowering businesses with end-to-end technology services. Build
          smarter, operate faster, and innovate securely in a connected digital
          world.
        </i>
      </Subtitle>
      <div
        style={{
          boxShadow: "-moz-initial",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "#65534d",
          position: "relative",
          height: "600px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: "#65534d",
            position: "relative",
            height: "500px",
            width: "100%",
            margin: "0.3%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              position: "relative",
              height: "80%",
              width: "100%",
              margin: "0.3%",
            }}
          >
            <div
              // style={{
              //   position: "absolute",
              //   width: "50%",
              //   height: "100%",
              //   justifyContent: "center",
              //   alignItems: "center",
              //   marginRight: "10%",
              // }}
              className={`${!isMobile ? "circleComp" : "circlComponent"}`}
            >
              {" "}
              {/* {!isMobile ? ( */}
              <CircleComponent
                activeCircle={activeCircle}
                width={450}
                height={430}
                page={page}
              />
              {/* // ) : (
              //   <CircleComponent
              //     activeCircle={activeCircle}
              //     width={100}
              //     height={100}
              //   />
              // )} */}
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "75%",
                transform: "translate(-50%, -50%)",
                //backgroundColor: "lightblue",
                margin: "1%",
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "space-evenly",
              }}
              className={`${isMobile ? "col-xs-12" : "col-md-5"}`}
            >
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
              />
              {openPhysician && (
                <div
                  onClick={handleClick}
                  className="image-transition"
                  style={{ cursor: "pointer", opacity: openPhysician ? 1 : 0 }}
                >
                  <StepTitle>Data Analytics & AI</StepTitle>
                  <StepSubtitle>
                    We transform raw data into actionable insights through
                    advanced analytics and visualization. Our solutions help you
                    uncover trends, optimize performance, and drive smarter
                    decisions.
                  </StepSubtitle>
                  <Button
                    className="mt-auto"
                    style={{
                      backgroundColor: "#65534d",
                      color: "white",
                      border: "none",
                      fontSize: "20px",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <span
                      className="fas fa-search fa-lg"
                      style={{ color: "white", marginRight: "30px" }}
                    ></span>
                    (Click to Request Demo)
                  </Button>
                </div>
              )}
              {openPatient && (
                <div
                  onClick={handleClick}
                  className="image-transition"
                  style={{ cursor: "pointer", opacity: openPatient ? 1 : 0 }}
                >
                  <StepTitle>Frontend Development / Support</StepTitle>
                  <StepSubtitle>
                    We build responsive, user-friendly interfaces that look
                    great and perform flawlessly across devices. Our frontend
                    solutions combine modern frameworks like React, Vue, and
                    Angular with pixel-perfect design implementation to ensure
                    fast, accessible, and scalable web experiences.
                  </StepSubtitle>
                  <Button
                    className="mt-auto"
                    style={{
                      backgroundColor: "#65534d",
                      color: "white",
                      border: "none",
                      fontSize: "20px",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <span
                      className="fas fa-search fa-lg"
                      style={{ color: "white", marginRight: "30px" }}
                    ></span>
                    (Click to Request Demo)
                  </Button>
                </div>
              )}
              {openPayer && (
                <div
                  onClick={handleClick}
                  className="image-transition"
                  style={{ cursor: "pointer", opacity: openPayer ? 1 : 0 }}
                >
                  <StepTitle>API Management</StepTitle>
                  <StepSubtitle>
                    We build secure, scalable REST APIs that connect systems,
                    apps, and data effortlessly. Our APIs are designed for
                    performance, reliability, and integration
                  </StepSubtitle>
                  <Button
                    className="mt-auto"
                    style={{
                      backgroundColor: "#65534d",
                      color: "white",
                      border: "none",
                      fontSize: "20px",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <span
                      className="fas fa-search fa-lg"
                      style={{ color: "white", marginRight: "30px" }}
                    ></span>
                    (Click to Request Demo)
                  </Button>
                </div>
              )}
              {openProvider && (
                <div
                  onClick={handleClick}
                  className="image-transition"
                  style={{ cursor: "pointer", opacity: openProvider ? 1 : 0 }}
                >
                  <StepTitle>QA & Testing</StepTitle>
                  <StepSubtitle>
                    Application Testing Ensure flawless performance, security,
                    and user experience. Our end-to-end application testing
                    services help identify bugs, improve functionality, and
                    deliver high-quality software with confidence.
                  </StepSubtitle>
                  <Button
                    className="mt-auto"
                    style={{
                      backgroundColor: "#65534d",
                      color: "white",
                      border: "none",
                      fontSize: "20px",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <span
                      className="fas fa-search fa-lg"
                      style={{ color: "white", marginRight: "30px" }}
                    ></span>
                    (Click to Request Demo)
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              position: "relative",
              height: "20%",
              width: "100%",
              marginbotton: "100px",
            }}
          >
            <HorizontalLayout
              width_={1600}
              height_={120}
              onShapeMouseOut={handleMouseOutEvent}
              onShapeMouseOver={onShapeMouseOverEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SamplePage;
