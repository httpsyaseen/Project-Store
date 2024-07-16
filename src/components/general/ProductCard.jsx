import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
  Button,
  styled,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../features/cartSlice";
import base64ToImageUrl from "../../utils/imageConverter";
///////////////
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 300,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  flexGrow: 1,
}));

const ProductName = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "3em",
  marginBottom: theme.spacing(1),
}));

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    toast.success("Add to cart!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // dispatch(cartActions.clearCart());
    dispatch(
      cartActions.addItemToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );
  };

  return (
    <Col md={4} lg={3} className="mt-5">
      <StyledCard className="shadow-lg">
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
          }}
          image={base64ToImageUrl(product.image)}
          alt={product.name}
        />
        <ContentBox>
          <CardContent
            onClick={() => navigate(`/product-detail/${product._id}`)}
            style={{ cursor: "pointer" }}
          >
            <ProductName
              variant="subtitle1"
              component="h2"
              style={{ fontWeight: "bold" }}
            >
              {product.name}
            </ProductName>
            <Box display="flex" alignItems="center" mb={1}>
              <Rating
                value={product.rating || 4.5}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography variant="body2" color="text.secondary" ml={1}>
                ({product.totalRatings || 48})
              </Typography>
            </Box>
            <Box display="flex" alignItems="baseline" mb={1}>
              <Typography variant="h6" color="error" mr={1}>
                Rs.
                {product.discountAvailable
                  ? product.discountPrice
                  : product.price}
              </Typography>

              {product.discountAvailable && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  Rs.{product.price}
                </Typography>
              )}
            </Box>
            {product.discountAvailable && (
              <Chip
                label={`${Math.trunc(
                  ((product.price - product.discountPrice) / product.price) *
                    100
                )}% OFF`}
                color="error"
                size="small"
                sx={{ fontWeight: "bold", marginBottom: 1 }}
              />
            )}
          </CardContent>
          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            fullWidth
            onClick={addToCartHandler}
            sx={{ mt: "auto" }}
          >
            Add to Cart
          </Button>
        </ContentBox>
      </StyledCard>
    </Col>
  );
};

export default ProductCard;
