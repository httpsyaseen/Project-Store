import { Navbar, Container, Nav, Row, NavDropdown, Col } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";

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
  return (
    <Navbar expand="md" bg="light" variant="light" className="shadow">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src="https://tinopia.com/wp-content/uploads/2023/12/180-by-60-01.png"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Products</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
            <NavDropdown
              title="Categories"
              id="navbarDropdown"
              className="d-md-none"
            >
              <NavDropdown.Item href="#">Greeting Cards</NavDropdown.Item>
              <NavDropdown.Item href="#">Home Decors</NavDropdown.Item>
              <NavDropdown.Item href="#">Eidi Cards</NavDropdown.Item>
              <NavDropdown.Item href="#">Stickers</NavDropdown.Item>
              <NavDropdown.Item href="#">Envelop</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="#" className="nav-link mr-3">
              <FaShoppingCart size={"1.8rem"} className="pe-2" />
              Cart
            </Nav.Link>
            <Nav.Link href="#" className="nav-link nav-item mr-3">
              <FaUser size={"1.5rem"} className="pe-2" />
              Account
            </Nav.Link>
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
            href=""
            className="category-item p-4 text-decoration-none m-2 fw-medium"
          >
            Greeting Cards
          </a>
          <a
            href=""
            className="category-item p-4 text-decoration-none m-2 fw-medium"
          >
            Home Decors
          </a>
          <a
            href=""
            className="category-item p-4 text-decoration-none m-2 fw-medium"
          >
            Eidi Cards
          </a>
          <a
            href=""
            className="category-item p-4 text-decoration-none m-2 fw-medium"
          >
            Stickers
          </a>
          <a
            href=""
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
