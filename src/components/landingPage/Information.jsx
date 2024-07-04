import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaTruck, FaPhone, FaGift } from "react-icons/fa";

const Information = () => {
  const information = [
    {
      title: "Nation Wide Delivery",
      info: "Fast and reliable nationwide delivery for your convenience",
      icon: <FaTruck size={"6rem"} />,
    },
    {
      title: "Nation Wide Delivery",
      info: "Responsive and friendly customer support at your fingertips",
      icon: <FaPhone size={"6rem"} />,
    },
    {
      title: "Gift Shopping Delight",
      info: "Responsive and friendly customer support at your fingertips",
      icon: <FaGift size={"6rem"} />,
    },
  ];
  return (
    <div className="bg-light">
      <Container className="mt-5">
        <Row>
          {information.map((info) => {
            return (
              <>
                <Col
                  md={4}
                  className="d-flex flex-column justify-content-center gap-3 my-5"
                >
                  <div className="icon text-center">{info.icon}</div>
                  <h2 className="title text-center">{info.title}</h2>
                  <div className="description text-center">{info.info}</div>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Information;
