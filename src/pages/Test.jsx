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

const ProductCard = () => {
  const product = {
    name: "Tiger Printed Cotton Half Sleeves O Neck Short & T-Shirt Set",
    image: "https://picsum.photos/id/256/700",
    rating: 4.5,
    reviewCount: 480,
    discountPrice: 767,
    originalPrice: 1999,
    discountPercentage: 62,
  };

  return (
    <Col md={4} lg={3} className="mt-3">
      <StyledCard className="product-card">
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
          }}
          image={product.image}
          alt={product.name}
        />
        <ContentBox>
          <CardContent>
            <ProductName variant="subtitle1" component="h2">
              {product.name}
            </ProductName>
            <Box display="flex" alignItems="center" mb={1}>
              <Rating value={product.rating} readOnly size="small" />
              <Typography variant="body2" color="text.secondary" ml={1}>
                ({product.reviewCount})
              </Typography>
            </Box>
            <Box display="flex" alignItems="baseline" mb={1}>
              <Typography variant="h6" color="error" mr={1}>
                Rs.{product.discountPrice}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                Rs.{product.originalPrice}
              </Typography>
            </Box>
            <Chip
              label={`${product.discountPercentage}% OFF`}
              color="error"
              size="small"
              sx={{ fontWeight: "bold", marginBottom: 1 }}
            />
          </CardContent>
          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            fullWidth
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
