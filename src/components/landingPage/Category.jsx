import { Container, Row } from "react-bootstrap";
import ProductCard from "../ProductCard";
import { useEffect, useState } from "react";
import SkeletonLoading from "../SkeletonLoading";

const Category = ({ category = "/trending", type = "Trending Products" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:3000/products${category}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          const data = await response.json();
          setProducts(data.products);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    },
    [category]
  );

  return (
    <>
      <Container>
        <div className="category-header pt-4">
          <span className="line"></span>
          <p className="text-center mx-4 h2">{type}</p>
          <span className="line"></span>
        </div>
        {loading && (
          <>
            <Row>
              <SkeletonLoading />
            </Row>
          </>
        )}
        <Row>
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Category;
