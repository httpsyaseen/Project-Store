import { Col, Button } from "react-bootstrap";
import productImage from "../assets/product.webp";
import { useNavigate } from "react-router-dom";

const Product = ({ image }) => {
  const navigate = useNavigate();

  return (
    <>
      <Col md={3} className="d-flex justify-content-center">
        <div className="product-card">
          <img
            src={image}
            alt="No Image"
            onError={(e) => (e.target.src = `${productImage}`)}
          />
          <div className="product-details">
            <h3 className="product-title text-center">Thomas Shelby</h3>
            <div className="product-price ms-3 ">
              <span className="original text-decoration-line-through">
                Rs 90/-
              </span>
              <span className="discount">Rs 20/-</span>
            </div>
            <Button className="add-to-cart" onClick={() => navigate(`/id`)}>
              Add to Cart
            </Button>
          </div>
        </div>
      </Col>
    </>
  );
};

export default Product;
