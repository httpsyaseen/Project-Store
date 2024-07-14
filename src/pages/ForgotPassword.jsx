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
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import notify from "../utils/notify";
import ForgotPasswordImage from "../assets/forgot.svg"; // Make sure to add this image to your assets folder

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mailSent, setMailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = "http://localhost:3000/api/v1/users/forgot";
      await axios.post(url, { email });
      notify("Password reset Link sent to your email", "success");
      setLoading(false);
      setMailSent(true);
    } catch (error) {
      notify("Failed to send reset Link", "error");
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={ForgotPasswordImage}
            alt="Forgot Password"
            sx={{
              width: "100%",
              maxWidth: "200px",
              height: "auto",
              mb: 2,
            }}
          />
          <Typography component="h1" variant="h5" align="center">
            Forgot Password
          </Typography>
        </Box>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={mailSent ? "success" : "primary"}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading
              ? "Sending Mail"
              : mailSent
              ? "Mail Sent"
              : "Forgot Password"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Remember your password? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
