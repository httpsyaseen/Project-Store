import productImage from "../assets/product.webp";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button, Carousel } from "react-bootstrap";

const ProductDetails = () => {
  const navigate = useNavigate();
  const photo = `https://picsum.photos/id/256/700`;
  return (
    <>
      <Container className="mt-5 defualt-height">
        <Row>
          <Col md={6}>
            <Row className="mt-5">
              <Carousel fade>
                <Carousel.Item>
                  <img
                    className="d-block w-100 c-image"
                    src={productImage}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 c-image"
                    src={photo}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 c-image"
                    src={productImage}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </Row>
          </Col>
          <Col md={6} className="mt-5 ">
            <Row className="ms-md-5 ps-md-5 gap-4 ">
              <h2>Anime panic Sticker</h2>
              <h3>Rs 78</h3>
              <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi
                voluptates maiores dicta non aut deserunt repudiandae libero
                sint incidunt, nam dolor vero dolore reprehenderit architecto
                qui tempora nisi et rerum quia nesciunt! Sapiente quisquam rem
                aspernatur! Earum rerum a ex totam quibusdam, delectus rem
                ratione. Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Quidem praesentium laboriosam omnis eaque rerum sequi
                quaerat repellendus veritatis iste deserunt corrupti incidunt
                dolor reprehenderit iusto sit cupiditate, necessitatibus iure
                porro unde veniam excepturi eligendi accusantium. Corrupti
                ducimus vitae voluptatum repellendus! Tempora quasi quo officia
                quis veritatis amet et, vero quibusdam.
              </div>
              <div className="d-flex align-items-center mb-3">
                <Button variant="outline-secondary" size="sm" className="px-3">
                  -
                </Button>
                <input
                  type="text"
                  className="form-control mx-2 text-center"
                  style={{ width: "80px" }}
                  value="1"
                  readOnly
                />
                <Button variant="outline-secondary" size="sm" className="px-3">
                  +
                </Button>
              </div>

              <Button
                className="add-to-cart w-50"
                onClick={() => navigate(`/cart`)}
              >
                Add to Cart
              </Button>

              <p className="mt-3">
                <small>SKU: 240004</small>
                <br />
                <small>
                  Categories: <a href="#">Anime</a>, <a href="#">Stickers</a>
                </small>
              </p>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;
