import React, { useState } from "react";
import { Button, Offcanvas, Form, Col, Row } from "react-bootstrap";
import styles from "./test.module.css";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        className="mx-auto d-block my-3"
        onClick={handleShow}
      >
        Open Sidebar
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className={styles.offcanvas}
      >
        <Offcanvas.Header closeButton className={styles["offcanvas-header"]}>
          <Offcanvas.Title className={styles["sidebar-title"]}>
            Filter Options
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles["offcanvas-body"]}>
          <Form>
            {/* Sorting Options */}
            <Form.Group
              controlId="sortOptions"
              className={styles["form-group"]}
            >
              <Form.Label className={styles["form-label"]}>Sort By</Form.Label>
              <Form.Control as="select">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
                <option>Customer Rating</option>
              </Form.Control>
            </Form.Group>

            {/* Category Filter */}
            <Form.Group
              controlId="categoryFilter"
              className={styles["form-group"]}
            >
              <Form.Label className={styles["form-label"]}>Category</Form.Label>
              <Form.Control as="select">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Kitchen</option>
              </Form.Control>
            </Form.Group>

            {/* Price Limit */}
            <Form.Group controlId="priceLimit" className={styles["form-group"]}>
              <Form.Label className={styles["form-label"]}>
                Price Limit
              </Form.Label>
              <Row className={styles.row}>
                <Col>
                  <Form.Control type="number" placeholder="Min Price" />
                </Col>
                <Col>
                  <Form.Control type="number" placeholder="Max Price" />
                </Col>
              </Row>
            </Form.Group>

            {/* Rating Filter */}
            <Form.Group
              controlId="ratingFilter"
              className={styles["form-group"]}
            >
              <Form.Label className={styles["form-label"]}>Rating</Form.Label>
              <Form.Control as="select">
                <option>All Ratings</option>
                <option>4 Stars & Up</option>
                <option>3 Stars & Up</option>
                <option>2 Stars & Up</option>
                <option>1 Star & Up</option>
              </Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className={styles["apply-filters-btn"]}
            >
              Apply Filters
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
