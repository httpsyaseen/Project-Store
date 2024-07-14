import React from "react";
import NotFoundImage from "../assets/404.svg";
import NotAuthorized from "../assets/unauth.svg";
import { Container } from "react-bootstrap";

export default function NotFound() {
  return (
    <Container className="d-flex justify-content-center">
      <img src={NotFoundImage} style={{ objectFit: "cover" }} />
    </Container>
  );
}
