import { Carousel } from "react-bootstrap";
import image1 from "../../assets/s1.jpg";
import image2 from "../../assets/s2.jpg";
import image3 from "../../assets/s3.jpg";

const Slider = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block w-100 c-image" src={image1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 c-image"
          src={image2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100 c-image" src={image3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
