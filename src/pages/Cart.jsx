import React, { useState } from "react";
import productImage from "../assets/product.webp";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const price = 78;
  const subtotal = price * quantity;

  return (
    <Container className="mt-5  defualt-height">
      <h1>Cart</h1>
      <Row>
        <Col lg={8}>
          <Table bordered style={{ overflowX: "auto" }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center flex-column flex-md-row">
                    <img
                      src={productImage}
                      alt="Anime panic Sticker"
                      width="50"
                      className="me-2"
                    />
                    <span>Anime panic Sticker</span>
                  </div>
                </td>
                <td>Rs {price}</td>
                <td>
                  <InputGroup>
                    <Button
                      variant="outline-secondary"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <Form.Control
                      type="text"
                      value={quantity}
                      readOnly
                      className="text-center"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </InputGroup>
                </td>
                <td>Rs {subtotal}</td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center flex-column flex-md-row">
                    <img
                      src={productImage}
                      alt="Anime panic Sticker"
                      width="50"
                      className="me-2"
                    />
                    <span>Anime panic Sticker</span>
                  </div>
                </td>
                <td>Rs {price}</td>
                <td>
                  <InputGroup>
                    <Button
                      variant="outline-secondary"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <Form.Control
                      type="text"
                      value={quantity}
                      readOnly
                      className="text-center"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </InputGroup>
                </td>
                <td>Rs {subtotal}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col lg={4}>
          <div className="border p-3">
            <h4>Cart totals</h4>
            <Table>
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td>Rs {subtotal}</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>
                    <Form.Check
                      type="radio"
                      id="free-shipping"
                      label="Free shipping"
                      name="shipping"
                      defaultChecked
                    />
                    <Form.Check
                      type="radio"
                      id="flat-rate"
                      label="Flat rate: Rs 250"
                      name="shipping"
                    />
                    <small className="text-muted">
                      Shipping options will be updated during checkout.
                    </small>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>Rs {subtotal}</strong>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Button
              variant="primary add-to-cart"
              block
              onClick={() => navigate("/checkout")}
            >
              Proceed to checkout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
