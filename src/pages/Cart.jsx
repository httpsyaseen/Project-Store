import React from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../features/cartSlice";

const Cart = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrement = (item) => {
    dispatch(cartActions.addItemToCart(item));
  };

  const handleDecrement = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  return (
    <Container className="mt-5 defualt-height">
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
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center flex-column flex-md-row">
                      <img
                        src={item.image || "default-image-path.jpg"} // Add a default image path
                        alt={"no"}
                        width="50"
                        className="me-2"
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>Rs {item.price}</td>
                  <td>
                    <InputGroup>
                      <Button
                        variant="outline-secondary"
                        style={{ borderRadius: "50px" }}
                        onClick={() => handleDecrement(item.id)}
                      >
                        -
                      </Button>
                      <div
                        className="px-3 border-5 btn-group-vertical  shadow-lg"
                        style={{ border: "2px" }}
                      >
                        {item.quantity}
                      </div>
                      <Button
                        variant="outline-secondary"
                        style={{ borderRadius: "50px" }}
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </Button>
                    </InputGroup>
                  </td>
                  <td>Rs {item.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
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
                  <td>Rs {totalAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>
                    <div>Flat rate: Rs 250</div>
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
                    <strong>Rs {(totalAmount + 250).toFixed(2)}</strong>
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
