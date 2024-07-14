import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/authSlice"; // Assume this action exists
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import notify from "../utils/notify";
import { useParams } from "react-router-dom";
import ResetPasswordIllustration from "../assets/forgot.svg";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      notify("Passwords do not match", "error");
      return;
    }
    console.log(formData);
    const result = await dispatch(
      resetPassword({ credentials: formData, token })
    );

    if (result.type === "auth/resetPassword/fulfilled") {
      notify("Password Reset Successful", "success");
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
            src={ResetPasswordIllustration}
            alt="Reset Password"
            sx={{ width: "100%", maxWidth: 500 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, maxWidth: 400, margin: "auto" }}>
            <Typography component="h1" variant="h5" align="center">
              Reset Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
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
                label="Confirm New Password"
                type="password"
                id="passwordConfirm"
                autoComplete="new-password"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResetPasswordForm;
