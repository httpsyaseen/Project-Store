import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const Welcome = () => {
  return (
    <div className="bg-light">
      <Container className="mt-5">
        <Row>
          <Col className="d-flex gap-3 flex-column py-5">
            <h1 className="text-center">WELCOME TO TINOPIA</h1>
            <div className="text-center">
              At Tinopia we are more than a gift shop
            </div>
            <div className="text-center">
              We’re your personal gift matchmakers.
            </div>
            <div className="text-center">
              Our mission is simple: to help you find the perfect gifts
              effortlessly.
            </div>
            <div className="text-center">
              Whether it’s for a birthday, anniversary, or just because, our
              curated selection ensures every gift is a special moment waiting
              to happen.
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Welcome;
