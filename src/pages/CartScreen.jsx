import React from "react";
import {
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../features/cartSlice";
import base64ToImageUrl from "../utils/imageConverter";
import EmptyCart from "../assets/empty.jpg";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Cart() {
  const { items, totalAmount } = useSelector((state) => state.cart);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }} className="defualt-height">
      <Typography variant="h3" gutterBottom>
        Your Cart
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            {items.length === 0 && (
              <Box sx={{ textAlign: "center" }}>
                <Box
                  component="img"
                  src={EmptyCart}
                  alt="Empty Cart"
                  sx={{
                    width: "100%",
                    maxWidth: { xs: "200px", sm: "300px", md: "400px" },
                    height: "auto",
                    mb: 2,
                  }}
                />
                <Typography variant="h4">Shopping Cart is Empty!</Typography>
                <Typography variant="h6">
                  {"But it's never too late to fix it :)"}
                </Typography>
              </Box>
            )}
            {items.map((item, index) => (
              <>
                <CartItem item={item} key={index} />
                {index < items.length - 1 && <Divider sx={{ my: 3 }} />}
              </>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <OrderSummary subtotal={totalAmount} shipping={10} />
        </Grid>
      </Grid>
    </Container>
  );
}

function CartItem({ item }) {
  const dispatch = useDispatch();
  const handleIncrement = (item) => {
    dispatch(cartActions.addItemToCart({ ...item, quantity: 1 }));
  };

  const handleDecrement = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={6}>
        <Grid container spacing={2} alignItems="center" flexWrap={"nowrap"}>
          <Grid item>
            <img
              src={base64ToImageUrl(item.image)}
              alt="Product Image"
              width={80}
              height={80}
              style={{ borderRadius: "4px", objectFit: "cover" }}
              onError={(e) => console.log(e)}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {/* {description} */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container alignItems="center">
              <IconButton size="small" onClick={() => handleDecrement(item.id)}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
              <IconButton size="small" onClick={() => handleIncrement(item)}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h6">${item.price.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function OrderSummary({ subtotal, shipping }) {
  const total = subtotal + shipping;
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Order Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="right">${subtotal.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Shipping</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="right">${shipping.toFixed(2)}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">Total</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" align="right">
            ${total.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        Proceed to Checkout
      </Button>
      <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
        Continue Shopping
      </Button>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleClearCart}
        startIcon={<DeleteIcon />}
      >
        Clear Cart
      </Button>
    </Paper>
  );
}
