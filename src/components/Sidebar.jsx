import React, { useEffect, useState } from "react";
import { Button, Offcanvas, Form, Col, Row } from "react-bootstrap";
import styles from "./sidebar.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../features/productSlice";

const Sidebar = ({ pageHandler }) => {
  const [show, setShow] = useState(false);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(function () {
    async function fetchCategories() {
      const res = await axios.get("http://localhost:3000/products/categories");
      setCategories(res.data.categories);
    }
    fetchCategories();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSortChange = (e) => setSort(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
  const handleRatingChange = (e) => setRating(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    let url = ``;
    if (sort) url += `sort=${sort}&`;
    if (minPrice) url += `price[gte]=${minPrice}&`;
    if (maxPrice) url += `price[lte]=${maxPrice}&`;
    if (category) url += `category=${category}&`;
    if (rating) url += `rating[gte]=${rating}&`;
    pageHandler(1);

    dispatch(fetchProducts({ query: url }));
    setShow(false);
  };

  const clearAllStates = () => {
    setSort("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    dispatch(fetchProducts({ clear: true }));
    setShow(false);
  };

  return (
    <>
      <Button
        variant="primary"
        className="mx-auto d-block my-3"
        onClick={handleShow}
      >
        Filter Products
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
                {categories.map((cat) => (
                  <>
                    <option value={cat._id} key={cat._id}>
                      {cat._id}
                    </option>
                  </>
                ))}
              </Form.Control>
            </Form.Group>

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
          <Button
            variant="dark"
            onClick={clearAllStates}
            className={styles["apply-filters-btn"]}
          >
            Clear Filters
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
