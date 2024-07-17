import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import image1 from "../../assets/s1.jpg";
import image2 from "../../assets/s2.jpg";
import image3 from "../../assets/s3.jpg";

const Slider = () => {
  const nav = useNavigate();
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100 c-image pointer"
          role="button"
          src={image1}
          alt="First slide"
          onClick={() => nav("/products")}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 c-image pointer "
          src={image2}
          role="button"
          alt="Second slide"
          onClick={() => nav("/products")}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 c-image pointer"
          src={image3}
          role="button"
          alt="Third slide"
          onClick={() => nav("/products")}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
