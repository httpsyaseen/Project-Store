import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
  Box,
  Chip,
  Skeleton,
} from "@mui/material";
import base64ToImageUrl from "../utils/imageConverter";
import EmptyOrders from "../assets/empty.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import notify from "../utils/notify";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function getOrders() {
      try {
        setLoading(true);
        const token = `Bearer ${Cookies.get("token")}`;
        const config = {
          headers: { "Content-Type": "application/json", Authorization: token },
        };
        const url = "http://localhost:3000/api/v1/orders/getUserOrders";

        const res = await axios.get(url, config);
        setLoading(false);
        setOrders(res.data.orders);
      } catch (error) {
        notify("Error getting your Orders", "error");
        setLoading(false);
      }
    }

    getOrders();
  }, []);

  function Loading() {
    return (
      <>
        <Skeleton height={"300px"} />
        <Skeleton width="60%" />
        <Skeleton />
        <Skeleton width="60%" />
        <Skeleton />
      </>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }} className="default-height">
      <Typography variant="h3" gutterBottom>
        Your Orders
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {loading && <Loading />}
          {orders.length === 0 ? (
            <Box sx={{ textAlign: "center" }}>
              <Box
                component="img"
                src={EmptyOrders}
                alt="No Orders"
                sx={{
                  width: "100%",
                  maxWidth: { xs: "200px", sm: "300px", md: "400px" },
                  height: "auto",
                  mb: 2,
                }}
              />
              <Typography variant="h4">No Orders Yet!</Typography>
              <Typography variant="h6">
                {"Start shopping to see your orders here."}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/products")}
                sx={{ mt: 2 }}
              >
                Shop Now
              </Button>
            </Box>
          ) : (
            orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderItem order={order} />
              </React.Fragment>
            ))
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

function OrderItem({ order }) {
  const random = "https://picsum.photos/200/300";
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6">Order #{order._id}</Typography>
          <Typography variant="body2" color="text.secondary">
            Order Date: {new Date(order.orderDate).toLocaleDateString()}
          </Typography>
          <Chip
            label={order.shipped ? "Shipped" : "Not Shipped"}
            color={order.shipped ? "success" : "warning"}
            sx={{ mt: 1 }}
          />
        </Grid>
        {order.products.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  flexWrap="nowrap"
                >
                  <Grid item>
                    <img
                      src={base64ToImageUrl(item.product.image)}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      style={{ borderRadius: "4px", objectFit: "cover" }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      {item.product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" align="right">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h5">Total</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="black">
                ${order.totalCost.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
