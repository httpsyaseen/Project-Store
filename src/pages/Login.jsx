import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Link as RouterLink } from "react-router-dom";
import notify from "../utils/notify";
import { login } from "../features/authSlice";
import LoginIllustration from "../assets/login.svg";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(formData));

    if (result.type === "auth/login/fulfilled") {
      notify("Login Successful", "success");
    } else if (result.error) {
      notify(result.payload.message, "error");
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "55vh" }}
      >
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={LoginIllustration}
            alt="Login"
            sx={{ width: "100%", maxWidth: 500 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, maxWidth: 400, margin: "auto" }}>
            <Typography component="h1" variant="h5" align="center">
              Log In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    component={RouterLink}
                    to="/forgot-password"
                    variant="body2"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                      "&:hover": {
                        color: "primary.dark",
                      },
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component={RouterLink}
                    to="/signup"
                    variant="body2"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                      "&:hover": {
                        color: "primary.dark",
                      },
                    }}
                  >
                    {" Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;
