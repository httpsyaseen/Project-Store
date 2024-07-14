import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateInfo } from "../../features/authSlice";
import notify from "../../utils/notify";

const AddressChange = () => {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const currentAddress = useSelector((state) => state.auth.user.address);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateInfo({ address }));
    if (result.type.includes("fulfilled"))
      notify("Address updated Successfully", "success");
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Change Address
      </Typography>
      <Typography variant="body1" fontWeight={"bold"} gutterBottom>
        Current Address: {currentAddress}
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
