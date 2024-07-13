import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateName } from "../../features/authSlice";
import notify from "../../utils/notify";

const NameChange = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateName({ name }));
    if (result.type.includes("fulfilled"))
      notify("Name updated Successfully", "success");
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Change Name
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Update Name
        </Button>
      </form>
    </Box>
  );
};

export default NameChange;
