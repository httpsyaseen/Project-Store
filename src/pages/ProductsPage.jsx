import { Container, Row, Col, Dropdown } from "react-bootstrap";
import Product from "../components/Product";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Container className="mt-5 defualt-height">
        <Row className="align-items-center justify-content-between mb-5">
          <Col xs="auto">
            <div>Showing 1 of 52 results</div>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <Dropdown.Toggle> Sort By</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Sort by highest to lowest price</Dropdown.Item>
                <Dropdown.Item>Sort by Reviews</Dropdown.Item>
                <Dropdown.Item>Sort by Popularity</Dropdown.Item>
                <Dropdown.Item>Sort by Lowest to Highest price</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row className="my-5">
          {products.map((product, i) => (
            <Product key={i} product={product} />
          ))}
        </Row>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Pagination count={10} color="primary" size="large" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductsPage;
