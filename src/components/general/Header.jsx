import {
  Navbar,
  Container,
  Nav,
  Row,
  NavDropdown,
  Col,
  Image,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import { cartActions } from "../../features/cartSlice";
import base64ToImageUrl from "../../utils/imageConverter";

const Header = ({ message }) => {
  return (
    <header className="w-100">
      {message ? <Disclaimer message={message} /> : <></>}
      <NavigationBar />
      <Categories />
    </header>
  );
};

function NavigationBar() {
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const { user, photo } = useSelector((state) => state.auth);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(cartActions.clearCart());
    navigate("/login");
  };

  return (
    <Navbar
      expand="md"
      bg="light"
      variant="light"
      className="shadow sticky-top"
    >
      <Container fluid>
        <LinkContainer to={"/"}>
          <Navbar.Brand>
            <img
              src="https://tinopia.com/wp-content/uploads/2023/12/180-by-60-01.png"
              alt="Logo"
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle
          aria-controls="navbarNav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <LinkContainer to={"/"}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/products"}>
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/"}>
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/"}>
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>

            <NavDropdown
              title="Categories"
              id="navbarDropdown"
              className="d-md-none"
            >
              <LinkContainer to={"/products"}>
                <NavDropdown.Item>Home Accessories</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={"/products"}>
                <NavDropdown.Item href="/products">Clothes</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={"/products"}>
                <NavDropdown.Item href="/products">FootWear</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={"/products"}>
                <NavDropdown.Item href="/products">
                  Cooking Items
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={"/products"}>
                <NavDropdown.Item href="/products">Gadgets</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Link to={"/cart"} className="nav-link mr-3 position-relative">
              <FaShoppingCart size={"1.8rem"} className="pe-2" />
              Cart
              <div
                className={`position-absolute text-center ${
                  quantity === 0 && "d-none"
                }  `}
                style={{
                  top: -2,
                  left: 19,
                  backgroundColor: "#1f2562",
                  color: "white",
                  padding: "1px 6px",
                  width: "25px",
                  fontSize: "16px",
                  borderRadius: "20px",
                }}
              >
                {quantity > 0 && quantity}
              </div>
            </Link>

            <NavDropdown
              title={
                <span>
                  {user && user.name ? (
                    <>
                      {photo && photo !== "null" ? (
                        <Image
                          src={base64ToImageUrl(photo)}
                          roundedCircle
                          width="30"
                          height="30"
                          className="me-2 object-fit-cover"
                          alt="User Avatar"
                        />
                      ) : (
                        <FaUser size={"1.5rem"} className="me-2" />
                      )}
                      {user.name}
                    </>
                  ) : (
                    <>
                      <FaUser size={"1.5rem"} className="me-2" />
                      Login
                    </>
                  )}
                </span>
              }
              id="accountDropdown"
              align="end"
            >
              {user ? (
                <>
                  <NavDropdown.Item as={Link} to="/profile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/userorders">
                    My Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
              )}
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
          <Link
            to={"/products"}
            className="category-item p-4 text-decoration-none m-2 fw-medium"
          >
            Home Accessories
          </Link>
          <a
            href="/products"
            className="category-item p-4 text-decoration-none m-2 fw-medium"
          >
            Clothes
          </a>
          <a
            href="/products"
            className="category-item p-4 text-decoration-none m-2 fw-medium"
          >
            FootWear
          </a>
          <a
            href="/products"
            className="category-item p-4 text-decoration-none m-2 fw-medium"
          >
            Cooking Items
          </a>
          <a
            href="/products"
            className="category-item p-4 text-decoration-none m-2 fw-medium"
          >
            Gadgets
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
