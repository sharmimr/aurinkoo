import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";

function ImageRight(props) {
  const { content, imgSrc, heading } = props;
  return (
    <div className="row align-items-center justify-content-center pt-5 pb-5">
      <div style={{ fontSize: "1.5rem" }} className="col-xs-12 col-md-6 p-5">
        <h2>{heading}</h2>
        <i>{content}</i>
      </div>
      <div className="image1 col-xs-12 col-md-6 ">
        <Image
          src={imgSrc}
          width="70%"
          style={{ borderRadius: "35% 2% 5% 5%" }}
          className="float-start img-fluid vh-40"
        />
      </div>
    </div>
  );
}

export default ImageRight;
