import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const PhoneChange = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Change Name
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="New Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Update Address
        </Button>
      </form>
    </Box>
  );
};

export default PhoneChange;
