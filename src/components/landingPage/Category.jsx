import { Container, Row } from "react-bootstrap";
import Product from "../Product";

const Category = () => {
  return (
    <>
      <Container>
        <div className="category-header pt-4">
          <span className="line"></span>
          <p className="text-center mx-4 h2">Trending Products</p>
          <span className="line"></span>
        </div>
        <Row>
          {new Array(4).fill(null).map((el, i) => (
            <Product
              key={i}
              image={`https://picsum.photos/id/${i + 210}/300`}
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Category;
