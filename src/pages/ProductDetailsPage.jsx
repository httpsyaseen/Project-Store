import productImage from "../assets/product.webp";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import base64ToImageUrl from "../utils/imageConverter";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        setProduct(data.product);
        setImage([
          base64ToImageUrl(data.product.image),
          base64ToImageUrl(data.product.image),
          base64ToImageUrl(data.product.image),
        ]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id]);
  console.log(image);

  const photo = `https://picsum.photos/id/256/700`;
  return (
    <>
      <Container className="mt-5 defualt-height">
        <Row>
          <Col md={6}>
            <Row className="mt-5">
              <Carousel fade>
                {image.map((item, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 c-image"
                      src={item}
                      alt={`Slide ${index + 1}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Row>
          </Col>
          <Col md={6} className="mt-5 ">
            <Row className="ms-md-5 ps-md-5 gap-4 ">
              <h2>{product.name}</h2>
              <h3>Rs {product.price}/-</h3>
              <div>{product.description}</div>
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
