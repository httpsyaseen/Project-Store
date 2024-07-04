import { Container, Row, Col, Button } from "react-bootstrap";
import productImage from "../../assets/product.webp";

const Products = () => {
  return (
    <>
      <Container>
        <div className="category-header pt-4">
          <span className="line"></span>
          <p className="text-center mx-4 h2">Trending Products</p>
          <span className="line"></span>
        </div>
        <Row>
          {new Array(3).fill(null).map((el) => {
            return (
              <>
                <Col md={4} className="d-flex justify-content-center">
                  <div className="product-card">
                    <img
                      src={productImage}
                      alt="Product Image"
                      className="img-fluid"
                    />
                    <div className="product-details d-flex flex-column justify-content-center align-content-center">
                      <h3 className="product-title text-center">
                        Thomas Shelby
                      </h3>
                      <div className="product-price text-center pb-3">
                        <span className="original text-decoration-line-through mr-2">
                          Rs 90/-
                        </span>
                        <span className="discount fw-bold">Rs 20/-</span>
                      </div>
                      <Button className="add-to-cart btn-outline-primary">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Products;
