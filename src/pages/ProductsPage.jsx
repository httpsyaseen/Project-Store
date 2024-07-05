import { Container, Row, Col, Dropdown } from "react-bootstrap";
import Product from "../components/Product";

const ProductsPage = () => {
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
          {new Array(20).fill(null).map((_, i) => (
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

export default ProductsPage;
