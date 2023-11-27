import { Box, Divider, Paper } from "@mui/material";
import React from "react";
import ProfileAEdata from "../fragments/ProfileIconData";
import ProfileData from "../fragments/ProfileData";

const Profile = () => {
  const sx = {
    width: "50vw", // Altura por defecto

    // Ajusta la altura para tamaños de pantalla específicos
    "@media (max-width: 600px)": {
      width: "90vw", // Altura para tamaños pequeños de pantalla (xs)
    },

    "@media (min-width: 601px) and (max-width: 960px)": {
      width: "90vw", // Altura para tamaños medianos de pantalla (sm)
    },

    "@media (min-width: 961px) and (max-width: 1280px)": {
      width: "50vw", // Altura para tamaños grandes de pantalla (md)
    },

    "@media (min-width: 1281px) and (max-width: 1920px)": {
      // pantalla 1080
      width: "45vw", // Altura para tamaños extra grandes de pantalla (lg)
    },

    "@media (min-width: 1921px)": {
      width: "35vw", // Altura para tamaños muy grandes de pantalla (xl)
    },
  };
  return (
    <Box>
      <Paper sx={sx} component="section">
        <ProfileAEdata />
        <Divider></Divider>
        <ProfileData />
      </Paper>
    </Box>
  );
};

export default Profile;
