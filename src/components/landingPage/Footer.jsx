import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="py-5"
      style={{ color: "white", backgroundColor: "#1f2562" }}
    >
      <Container fluid>
        <Row>
          <Col md={3} className="py-2">
            <h2 className="fw-bold text-center">About Us</h2>
            <p className="px-5">
              Spreading joy through thoughtful gifts! Find the perfect surprise
              for every occasion at our gift shop. Your moments, our treasures.
              From our shop to your loved ones with love.
            </p>
          </Col>
          <Col md={3} className="py-2 text-center">
            <h2 className="fw-bold">Useful Links</h2>
            <ul className="list-unstyled">
              <li>Home</li>
              <li>Shop</li>
              <li>Stickers</li>
              <li>Greeting cards</li>
              <li>Wishlist</li>
            </ul>
          </Col>
          <Col md={3} className="py-2 text-center">
            <h2 className="fw-bold">Contact Us</h2>
            <ul className="list-unstyled">
              <li>03198424168</li>
              <li>Support@tinopia.com</li>
            </ul>
          </Col>
          <Col md={3} className="py-2 text-center d-flex flex-column gap-3">
            <h2 className="fw-bold">Socials</h2>
            <div className="link d-flex justify-content-center flex-column gap-3 align-content-center">
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "inherit" }}
              >
                <FaFacebook
                  className="fa-2x"
                  style={{ verticalAlign: "middle" }}
                />{" "}
                Facebook
              </a>
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "inherit" }}
              >
                <FaInstagram
                  className="fa-2x"
                  style={{ verticalAlign: "middle" }}
                />{" "}
                Instagram
              </a>
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: "inherit" }}
              >
                <FaTwitter
                  className="fa-2x"
                  style={{ verticalAlign: "middle" }}
                />{" "}
                Twitter
              </a>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center flex-column">
          <Col className="d-flex flex-column">
            <img
              src="https://tinopia.com/wp-content/uploads/2023/12/180-by-60-01.png"
              alt="Tinopia Logo"
              width="150px"
              height="50px"
              className="align-self-center"
            />
            <div className="rights text-center">
              © 2024 Tinopia. All Rights Reserved
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
