import { Navbar, Container, Nav, Row, NavDropdown, Col } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ message }) => {
  return (
    <header>
      {message ? <Disclaimer message={message} /> : <></>}
      <NavigationBar />
      <Categories />
    </header>
  );
};

function NavigationBar() {
  const quantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <Navbar expand="md" bg="light" variant="light" className="shadow">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="https://tinopia.com/wp-content/uploads/2023/12/180-by-60-01.png"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
            <NavDropdown
              title="Categories"
              id="navbarDropdown"
              className="d-md-none"
            >
              <NavDropdown.Item href="/products">
                Greeting Cards
              </NavDropdown.Item>
              <NavDropdown.Item href="/products">Home Decors</NavDropdown.Item>
              <NavDropdown.Item href="/products">Eidi Cards</NavDropdown.Item>
              <NavDropdown.Item href="/products">Stickers</NavDropdown.Item>
              <NavDropdown.Item href="/products">Envelop</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Link to={"/cart"} className="nav-link mr-3 position-relative">
              <FaShoppingCart size={"1.8rem"} className="pe-2" />
              Cart
              <div
                className="position-absolute text-center"
                style={{
                  top: -2,
                  left: 19,
                  backgroundColor: "#1f2562",
                  color: "white",
                  paddin: "5px",
                  width: "20px",
                  fontSize: "14px",
                  borderRadius: "10px",
                }}
              >
                {quantity > 0 && quantity}
              </div>
            </Link>

            <NavDropdown
              title={
                <span>
                  <FaUser size={"1.5rem"} className="pe-2" />
                  Account
                </span>
              }
              id="accountDropdown"
              className="d-md-block"
            >
              <NavDropdown.Item href="#">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Disclaimer({ message }) {
  return (
    <div className="text-center disclaimer py-2">
      <p className="text-center h4 m-0">{message}</p>
    </div>
  );
}

function Categories() {
  return (
    <Container className="d-none d-md-block categories">
      <Row>
        <Col className="d-flex justify-content-center">
          <a
            href="/products"
            className="category-item p-4 text-decoration-none m-2 fw-medium"
          >
            Greeting Cards
          </a>
          <a
            href="/products"
            className="category-item p-4 text-decoration-none m-2 fw-medium"
          >
            Home Decors
          </a>
          <a
            href="/products"
            className="category-item p-4 text-decoration-none m-2 fw-medium"
          >
            Eidi Cards
          </a>
          <a
            href="/products"
            className="category-item p-4 text-decoration-none m-2 fw-medium"
          >
            Stickers
          </a>
          <a
            href="/products"
            className="category-item p-4 text-decoration-none m-2 fw-medium"
          >
            Envelop
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
