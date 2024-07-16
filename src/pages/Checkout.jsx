import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import base64ToImageUrl from "../utils/imageConverter";
import notify from "../utils/notify";
import EmptyCart from "../assets/empty.jpg";
import { createOrder } from "../utils/api";

function CheckoutForm() {
  const { items, totalAmount } = useSelector((state) => state.cart);

  const orderItems = items;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createOrder(orderItems, totalAmount)
      .then(() => {
        notify("Order Placed", "success");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
        setLoading(false);
      })
      .catch((err) => {
        notify("Error Placing Order", "error");
        setLoading(false);
      });
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: "40px 20px" }}>
      <Grid container spacing={4}>
        {/* Checkout Information Form */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ padding: "30px", borderRadius: "12px" }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", marginBottom: "30px" }}
            >
              Checkout Information
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Zip Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ padding: "30px", borderRadius: "12px" }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", marginBottom: "30px" }}
            >
              Order Summary
            </Typography>
            <Paper>
              {orderItems.length === 0 && (
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    component="img"
                    src={EmptyCart}
                    alt="Empty Cart"
                    sx={{
                      width: "100%",
                      maxWidth: { xs: "200px", sm: "300px", md: "400px" },
                      height: "auto",
                      // mb: 2,
                    }}
                  />

                  <Typography variant="h4">Shopping Cart is Empty!</Typography>
                </Box>
              )}
            </Paper>
            <List>
              {orderItems.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ py: 2 }}>
                    <ListItemAvatar>
                      <Avatar
                        alt={item.name}
                        src={base64ToImageUrl(item.image)}
                        variant="square"
                        style={{ width: 60, height: 60, marginRight: 10 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6">{item.name}</Typography>
                      }
                      secondary={`Quantity: ${item.quantity}`}
                    />
                    <Typography variant="h6">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItem>
                  {index < orderItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Divider />
            <ListItem>
              <ListItemText
                primary={<Typography variant="h6">Shipping Fees</Typography>}
              />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                ${10}
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={<Typography variant="h5">Total</Typography>}
              />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                ${(totalAmount + 10).toFixed(2)}
              </Typography>
            </ListItem>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                marginTop: "20px",
                padding: "15px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: "8px",
              }}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CheckoutForm;
