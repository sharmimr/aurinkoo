import { Outlet } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import style from "../index.css";
import { useState } from "react";
import { Container } from "react-bootstrap";

const Layout = () => {
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary fixed-top navbarStyle"
        xs={12}
      >
        <Navbar.Brand href="/">
          <img
            src="/assets/images/aurinko_cg.png"
            alt="Logo"
            width="100px"
            height="70px"
            className="d-none d-lg-block"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto offset-md-1">
            <Nav.Link href="/" className="ps-4 pe-4">
              <i className="bi bi-house-door-fill ss-icons m-1"></i>
              Home
            </Nav.Link>
            <NavDropdown
              className="caret-off ps-4 pe-4"
              title={
                <>
                  <i className="bi bi-list-ul ss-icons m-1"></i>
                  <span>Services </span>
                  {!isShown ? (
                    <span className="bi bi-chevron-down"></span>
                  ) : (
                    <span className="bi bi-chevron-up"></span>
                  )}
                </>
              }
              renderMenuOnMount
              id="dropdown-basic"
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              <div>
                <NavDropdown.Item href="/tech">
                  <i class="bi bi-laptop ss-icons m-1"></i>
                  <span>Tech Development & IT Support</span>
                </NavDropdown.Item>
                <NavDropdown.Item href="/sales">
                  <i class="bi bi-graph-up ss-icons m-1"></i>
                  <span>Digital Sales & Branding</span>
                </NavDropdown.Item>
                <NavDropdown.Item href="/writing">
                  <i class="bi bi-vector-pen ss-icons m-1"></i>
                  <span>Content Creation & Language Services</span>
                </NavDropdown.Item>
                <NavDropdown.Item href="/testing">
                  <i class="bi bi-ui-checks ss-icons m-1"></i>
                  <span>QA & Application Testing</span>
                </NavDropdown.Item>
                <NavDropdown.Item href="/edtech">
                  <i class="bi bi-person-workspace ss-icons m-1"></i>
                  <span>EdTech Learning</span>
                </NavDropdown.Item>
              </div>
            </NavDropdown>
            <Nav.Link href="/about" className="ps-4 pe-4">
              <i className="bi bi-question-circle-fill ss-icons m-1"></i>
              About
            </Nav.Link>

            <Nav.Link href="/careers" className="ps-4 pe-4">
              <i className="bi bi-briefcase-fill m-1"></i>
              Careers
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link href="/contactUs" className="me-5 ms-4 ps-3">
              <i className="bi bi-telephone-plus-fill m-1"></i>
              Collabrate With Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;
