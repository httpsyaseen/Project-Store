import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const AddressChange = () => {
  const [address, setAddress] = useState("");

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
          label="New Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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

export default AddressChange;
