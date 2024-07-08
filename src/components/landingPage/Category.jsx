import { Container, Row } from "react-bootstrap";
import ProductCard from "../ProductCard";
import { useEffect, useState } from "react";

const Category = () => {
  const [products, setProducts] = useState([]);

  useEffect(function () {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products/trending");
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
      <Container>
        <div className="category-header pt-4">
          <span className="line"></span>
          <p className="text-center mx-4 h2">Trending Products</p>
          <span className="line"></span>
        </div>
        <Row>
          {/* {new Array(4).fill(null).map((el, i) => ( */}
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Category;
