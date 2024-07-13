import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import profileImage from "../assets/profile.svg";

// Import components for each section (to be created)
import NameChange from "../components/profile/NameChange";
import PasswordChange from "../components/profile/PasswordChange";
import AddressChange from "../components/profile/AddressChange";
import PhoneChange from "../components/profile/PhoneChange";
// import PhotoChange from './profile/PhotoChange';

const MyProfile = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const profileOptions = [
    { label: "Change Name", icon: <PersonIcon />, value: "name" },
    { label: "Change Password", icon: <LockIcon />, value: "password" },
    { label: "Change Photo", icon: <PhotoCameraIcon />, value: "photo" },
    { label: "Change Address", icon: <HomeIcon />, value: "address" },
    { label: "Change Phone", icon: <PhoneIcon />, value: "phone" },
  ];

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case "name":
        return <NameChange />;
      case "password":
        return <PasswordChange />;
      case "address":
        return <AddressChange />;
      case "phone":
        return <PhoneChange />;
      default:
        return (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={profileImage}
              alt="Profile"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
        );
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Avatar
                  sx={{ width: 120, height: 120, mb: 2 }}
                  src="/path-to-profile-image.jpg"
                  alt="Profile"
                />
                <Typography variant="h6">John Doe</Typography>
                <Typography variant="body2" color="text.secondary">
                  john.doe@example.com
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List component="nav">
                {profileOptions.map((option) => (
                  <ListItem
                    button
                    key={option.value}
                    selected={selectedOption === option.value}
                    onClick={() => setSelectedOption(option.value)}
                  >
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.label} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Box sx={{ p: 3, bgcolor: "background.paper", minHeight: 400 }}>
                {renderSelectedComponent()}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default MyProfile;
