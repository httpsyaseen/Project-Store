import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
} from "react-bootstrap";
import productImage from "../assets/product.webp";

const Checkout = () => {
  const [quantity, setQuantity] = useState(15);

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Checkout</h1>
      <Row>
        <Col md={7}>
          <Form>
            <h4 className="mt-4">Shipping address</h4>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control as="select">
                <option>United States</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="firstName">
              <Form.Label>First name*</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last name*</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>
            <Form.Group controlId="streetAddress">
              <Form.Label>Street address*</Form.Label>
              <Form.Control type="text" placeholder="Enter street address" />
            </Form.Group>
            <Form.Group controlId="streetAddressContinue">
              <Form.Label>Street address (continue)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apartment, suite, unit, etc. (optional)"
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City*</Form.Label>
              <Form.Control type="text" placeholder="Enter city" />
            </Form.Group>
          </Form>
        </Col>
        <Col md={5}>
          <Card>
            <Card.Header>
              <h4 className="mb-0">Summary</h4>
            </Card.Header>
            <Card.Body>
              <div className="d-flex mb-3 gap-3">
                <img
                  src={productImage}
                  alt="Saleor Balance 420 Shoes"
                  width="100"
                  className="mr-3"
                />
                <div>
                  <h5 className="align-self-center">
                    Saleor Balance 420 Shoes
                  </h5>
                </div>
              </div>

              <hr />
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>$750.00</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping cost</span>
                <span>$0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total price</strong>
                <strong>$750.00</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
