import { Col, Button } from "react-bootstrap";
import productImage from "../assets/product.webp";
import { useNavigate } from "react-router-dom";
import Style from "./styles/Product.module.css";

const Product = ({ product }) => {
  const navigate = useNavigate();

  const base64ToImageUrl = (base64String) => {
    const byteString = atob(base64String);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: "image/png" });
    return URL.createObjectURL(blob);
  };

  return (
    <>
      <Col md={4} lg={3} className="d-flex justify-content-center">
        <div className={Style.productCard}>
          <img
            src={base64ToImageUrl(product.image)}
            alt="No Image"
            onError={(e) => (e.target.src = `${productImage}`)}
          />
          <div className="product-details">
            <h3 className="product-title text-center">{product.name}</h3>
            <div className="product-price ms-3 d-flex ">
              <span
                className={`${
                  product.discountAvailable
                    ? "original text-decoration-line-through h6 m-0"
                    : "h5 text-center align-self-center"
                }`}
              >
                Rs {product.price}/-
              </span>
              {product.discountAvailable && (
                <span className="discount h5">
                  Rs {product.discountPrice}/-
                </span>
              )}
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
