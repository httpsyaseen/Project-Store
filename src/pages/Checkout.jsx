import { Container, Row, Col, Button, Card } from "react-bootstrap";
import productImage from "../assets/product.webp";
import { TextField } from "@mui/material";

const Checkout = () => {
  return (
    <Container className="mt-5 defualt-height">
      <h1 className="mb-4">Checkout</h1>
      <Row>
        <Col md={7}>
          <form className="d-flex justify-content-center flex-column gap-3">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              autoFocus={true}
            />
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField
              id="outlined-basic"
              label="Shipping Address"
              variant="outlined"
            />
            <TextField id="outlined-basic" label="City" variant="outlined" />
          </form>
        </Col>
        <Col
          md={5}
          className="d-flex justify-content-center flex-column mt-5 mt-md-0"
        >
          <Card>
            <Card.Header>
              <h4 className="mb-0">Summary</h4>
            </Card.Header>
            <Card.Body>
              <div className="d-flex mb-3 gap-4 justify-content-around">
                <img
                  src={productImage}
                  alt="Saleor Balance 420 Shoes"
                  width="50px"
                  className="mr-3"
                  style={{ objectFit: "contain" }}
                />
                <div className="align-self-center">
                  <p className="h5">Anime Adhensive Stickers</p>
                </div>
                <div className="align-self-center">
                  <h6>Rs 10/-</h6>
                </div>
              </div>
              <hr />
              <div className="d-flex mb-3 gap-4 justify-content-around">
                <img
                  src={productImage}
                  alt="Saleor Balance 420 Shoes"
                  width="50px"
                  className="mr-3"
                  style={{ objectFit: "contain" }}
                />
                <div className="align-self-center">
                  <h5>Anime Adhensive Stickers</h5>
                </div>
                <div className="align-self-center">
                  <h6>Rs 10/-</h6>
                </div>
              </div>
              <hr />
              <div className="d-flex mb-3 gap-4 justify-content-around">
                <img
                  src={productImage}
                  alt="Saleor Balance 420 Shoes"
                  width="50px"
                  style={{ objectFit: "contain" }}
                  className="mr-3"
                />
                <div className="align-self-center">
                  <h5>Anime Adhensive Stickers</h5>
                </div>
                <div className="align-self-center">
                  <h6>Rs 10/-</h6>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>$750.00</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping cost</span>
                <span>$0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total price</strong>
                <strong>$750.00</strong>
              </div>
            </Card.Body>
            <Button className="add-to-cart">Place Order</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
