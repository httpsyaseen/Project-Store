import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Paper,
  Box,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../features/authSlice"; // Make sure this path is correct
import notify from "../utils/notify";
import SignupIllustration from "../assets/login.svg"; // Import your SVG

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      notify("Passwords don't match", "error");
      return;
    }
    try {
      await dispatch(signUp(formData)).unwrap();
      notify("Signup successful", "success");
      navigate("/login");
    } catch (error) {
      notify("Signup failed", "error");
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "75vh" }}
      >
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={SignupIllustration}
            alt="Signup"
            sx={{ width: "100%", maxWidth: 500 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, maxWidth: 400, margin: "auto" }}>
            <Typography component="h1" variant="h5" align="center">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 8 }}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                inputProps={{ minLength: 8 }}
                id="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                id="phoneNumber"
                autoComplete="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="address"
                label="Address"
                id="address"
                autoComplete="street-address"
                value={formData.address}
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="body2"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                      "&:hover": {
                        color: "primary.dark",
                      },
                    }}
                  >
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
