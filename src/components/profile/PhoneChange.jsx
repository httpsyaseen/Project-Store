import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateInfo } from "../../features/authSlice";
import notify from "../../utils/notify";

const PhoneChange = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const currentNumber = useSelector((state) => state.auth.user.phoneNumber);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateInfo({ phoneNumber }));
    if (result.type.includes("fulfilled"))
      notify("Phone Number updated Successfully", "success");
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Change Name
      </Typography>
      <Typography variant="body1" fontWeight={"bold"} gutterBottom>
        Current PhoneNumber: {currentNumber}
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
