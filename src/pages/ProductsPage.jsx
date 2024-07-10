import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { Pagination, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../features/productSlice";
import Sidebar from "../components/Sidebar";
import SkeletonLoading from "../components/SkeletonLoading";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    byPage,
    status,
    totalProducts = 30,
  } = useSelector((state) => state.product);
  const productsPerPage = 10;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!byPage[currentPage]) {
      setLoading(true);
      dispatch(
        fetchProducts({ page: currentPage, limit: productsPerPage })
      ).then(() => {
        setLoading(false);
      });
    } else {
      setProducts(byPage[currentPage]);
    }
  }, [status, dispatch, byPage, currentPage, productsPerPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Container className="mt-5 default-height">
      <Row className="align-items-center justify-content-between mb-5">
        <Col xs="auto">
          <div>
            Showing {products.length} of {totalProducts} results
          </div>
        </Col>
        <Col xs="auto">
          <Sidebar />
        </Col>
      </Row>
      {loading && (
        <>
          <Row>
            <SkeletonLoading />
          </Row>
        </>
      )}

      <Row className="my-5">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </Row>

      <Row className="justify-content-center">
        <Col xs="auto">
          <Pagination
            count={Math.ceil(totalProducts / productsPerPage)}
            color="primary"
            size="large"
            onChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
