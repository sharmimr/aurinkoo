import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";

function FluidExample(props) {
  const { content, imgSrc, heading, svg } = props;
  return (
    <div className={`row align-items-center justify-content-center pt-5 pb-5`}>
      <div className="col-xs-12 col-md-6 image1">
        <Image
          src={imgSrc}
          width="70%"
          style={{ borderRadius: "5% 2% 40% 2%" }}
          className="float-end img-fluid vh-40"
        />
      </div>
      <div style={{ fontSize: "1.5rem" }} className="col-xs-12 col-md-6 p-5">
        <h2>{heading}</h2>
        <i>{content}</i>
      </div>
    </div>
  );
}

export default FluidExample;
