import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  ImageList,
  ImageListItem,
  IconButton,
  Typography,
  Rating,
  ToggleButtonGroup,
  ToggleButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const productImages = [
  "https://picsum.photos/id/256/700",
  "https://picsum.photos/id/257/700",
  "https://picsum.photos/id/258/700",
  "https://picsum.photos/id/259/700",
];

const Test = () => {
  const [mainImage, setMainImage] = useState(productImages[0]);
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("black");
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (event, newSize) => {
    if (newSize !== null) {
      setSize(newSize);
    }
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardMedia
            component="img"
            height="500"
            image={mainImage}
            alt="Blazer Jacket"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <IconButton>
              <ChevronLeft />
            </IconButton>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Box>
        </Card>
        <ImageList cols={4} rowHeight={100} sx={{ mt: 2 }}>
          {productImages.map((img, index) => (
            <ImageListItem key={index} onClick={() => setMainImage(img)}>
              <img src={img} alt={`Thumbnail ${index + 1}`} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom>
          Blazer Jacket
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Rating value={4.9} precision={0.1} readOnly />
          <Typography variant="body2" sx={{ ml: 1 }}>
            (4.9)
          </Typography>
        </Box>
        <Typography variant="h5" gutterBottom>
          $2500
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Available Size
          </Typography>
          <ToggleButtonGroup value={size} exclusive onChange={handleSizeChange}>
            <ToggleButton value="S">S</ToggleButton>
            <ToggleButton value="M">M</ToggleButton>
            <ToggleButton value="L">L</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Available Color
          </Typography>
          <RadioGroup row value={color} onChange={handleColorChange}>
            <FormControlLabel value="black" control={<Radio />} label="Black" />
            <FormControlLabel value="gray" control={<Radio />} label="Gray" />
          </RadioGroup>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Quantity
          </Typography>
          <TextField
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            InputProps={{ inputProps: { min: 1 } }}
          />
        </Box>
        <Button variant="contained" color="primary" size="large">
          Add to cart
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Last 1 left - make it yours!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Test;
