import React, { useState } from "react";
import { Button, Offcanvas, Form, Col, Row } from "react-bootstrap";
import styles from "./sidebar.module.css";

const Sidebar = ({ open = false }) => {
  const [show, setShow] = useState(open);

  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSortChange = (e) => setSort(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
  const handleRatingChange = (e) => setRating(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const baseUrl = "http://localhost:3000/products";

    let url = `${baseUrl}?`;
    if (sort) url += `sort=${sort}`;
    if (minPrice) url += `price[gte]=${minPrice}`;
    if (maxPrice) url += `price[lte]=${maxPrice}`;

    console.log("Generated URL:", url);
  };

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
          <Form onSubmit={handleSubmit}>
            {/* Sorting Options */}
            <Form.Group
              controlId="sortOptions"
              className={styles["form-group"]}
            >
              <Form.Label className={styles["form-label"]}>Sort By</Form.Label>
              <Form.Control
                as="select"
                value={sort}
                onChange={handleSortChange}
              >
                <option value="">Select...</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
              </Form.Control>
            </Form.Group>

            <Form.Group
              controlId="categoryFilter"
              className={styles["form-group"]}
            >
              <Form.Label className={styles["form-label"]}>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">Select...</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="homekitchen">Home & Kitchen</option>
              </Form.Control>
            </Form.Group>

            {/* Price Limit */}
            <Form.Group controlId="priceLimit" className={styles["form-group"]}>
              <Form.Label className={styles["form-label"]}>
                Price Limit
              </Form.Label>
              <Row className={styles.row}>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                  />
                </Col>
              </Row>
            </Form.Group>

            {/* Rating Filter */}
            <Form.Group
              controlId="ratingFilter"
              className={styles["form-group"]}
            >
              <Form.Label className={styles["form-label"]}>Rating</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={handleRatingChange}
              >
                <option value="">Select...</option>
                <option value="4">4 Stars & Up</option>
                <option value="3">3 Stars & Up</option>
                <option value="2">2 Stars & Up</option>
                <option value="1">1 Star & Up</option>
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
