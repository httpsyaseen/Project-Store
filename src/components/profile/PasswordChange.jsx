import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import notify from "../../utils/notify";
import { updatePassword } from "../../features/authSlice";
import { useDispatch } from "react-redux";

const NameChange = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      notify("New Password and Confirm Password does not match", "error");
      return;
    }

    const result = await dispatch(
      updatePassword({
        oldPassword,
        newPassword,
        newPasswordConfirm: confirmPassword,
      })
    );
    if (result.type.includes("fulfilled"))
      notify("Password Changed Successfully", "success");
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Change Name
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          margin="normal"
          type="password"
        />
        <TextField
          fullWidth
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
          type="password"
        />
        <TextField
          fullWidth
          label="confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          type="password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Update Password
        </Button>
      </form>
    </Box>
  );
};

export default NameChange;
