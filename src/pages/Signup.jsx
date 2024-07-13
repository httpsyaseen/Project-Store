import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { signUp } from "../features/authSlice"; // Make sure this path is correct

const SignupForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert("Passwords don't match");
      return;
    }
    dispatch(signUp(formData));
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicpasswordConfirm" className="mt-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirm"
                placeholder="Confirm Password"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhoneNumber" className="mt-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicAddress" className="mt-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
