// src/components/Login.js

import React from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Container maxWidth="xs" className="defualt-height">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Box mt={2}>
          <Link to="/signup">Dont have an account? Sign Up</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
