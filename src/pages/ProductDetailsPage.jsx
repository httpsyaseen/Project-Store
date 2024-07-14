import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  IconButton,
  Rating,
  Chip,
} from "@mui/material";
import { Carousel, Container } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams } from "react-router-dom";
import base64ToImageUrl from "../utils/imageConverter";
import { useDispatch } from "react-redux";
import { cartActions } from "../features/cartSlice";
import Category from "../components/landingPage/Category";

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        setProduct(data.product);
        setImage([
          base64ToImageUrl(data.product.image),
          base64ToImageUrl(data.product.image),
          base64ToImageUrl(data.product.image),
        ]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id]);
  console.log(image);

  const handleQuantityChange = (change) => {
    if (quantity <= 1 && change < 0) return;
    setQuantity((quantity) => quantity + change);
  };

  const handleVariantChange = (event) => {
    setSelectedVariant(event.target.value);
  };

  const handleAddToCart = () => {
    dispatch(
      cartActions.addItemToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      })
    );
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <Carousel fade>
                {image.map((item, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 c-image"
                      src={item}
                      alt={`Slide ${index + 1}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Typography variant="h4" gutterBottom fontWeight="bold">
                {product.name}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={4.5} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  (150 reviews)
                </Typography>
              </Box>

              <Typography variant="h5" color="primary" gutterBottom>
                ${product.price}
              </Typography>

              <Chip
                label="In Stock"
                color="success"
                sx={{ width: "fit-content", mb: 2 }}
              />

              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              <FormControl fullWidth margin="normal">
                <InputLabel>Select Variant</InputLabel>
                <Select
                  value={selectedVariant}
                  label="Select Variant"
                  onChange={handleVariantChange}
                >
                  <MenuItem value="black">Black</MenuItem>
                  <MenuItem value="silver">Silver</MenuItem>
                  <MenuItem value="gold">Gold</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <Typography variant="body1" mr={2}>
                  Quantity:
                </Typography>
                <IconButton
                  onClick={() => handleQuantityChange(-1)}
                  size="small"
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" sx={{ mx: 2 }}>
                  {quantity}
                </Typography>
                <IconButton
                  onClick={() => handleQuantityChange(1)}
                  size="small"
                >
                  <AddIcon />
                </IconButton>
              </Box>

              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                size="large"
                onClick={handleAddToCart}
                sx={{ mt: "5" }}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Category
        category={`?limit=4&category=${product.category}&`}
        type={"Related Products"}
      />
    </Container>
  );
};

export default ProductPage;
