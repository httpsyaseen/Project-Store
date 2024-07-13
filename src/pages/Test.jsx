import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup:", { name, email, password, confirmPassword });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <PersonAddOutlinedIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h5" component="h1">
          Sign Up
        </Typography>
      </Box>
      <TextField
        label="Full Name"
        fullWidth
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign Up
      </Button>
    </StyledForm>
  );
};

export default SignupForm;
