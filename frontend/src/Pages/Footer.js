import React from "react";
import { Container } from "rsuite";

export const Foot = () => {
  return (
    <Container className="foot row">
      <div className="col-xs-12 col-lg-4 d-flex justify-content-center align-middle">
        <img
          src="/assets/images/aurinko_cg.png"
          alt="Logo"
          width="100px"
          height="70px"
        />
      </div>
      <div className="col-xs-12 col-lg-4 d-flex justify-content-center mt-2 align-middle">
        Copyright 2025 Aurinko Technologies | All Rights Reserved Privacy Policy
      </div>

      <div className="col-xs-12 col-lg-3 d-flex justify-content-center m-2 align-middle">
        Follow us on
        <a href="https://www.twitter.com">
          <i className="bi bi-twitter-x ss-icons m-1"></i>
        </a>
        <a href="https://www.facebook.com">
          <i className="bi bi-facebook ss-icons m-1"></i>
        </a>
        <a href="https://www.instagram.com">
          <i className="bi bi-instagram ss-icons m-1"></i>
        </a>
        <a href="https://www.linkedin.com">
          <i className="bi bi-linkedin ss-icons m-1"></i>
        </a>
      </div>
    </Container>
  );
};
