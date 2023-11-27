import { Divider, Grid, Paper, Typography, TextField } from "@mui/material";
import React from "react";
import UserBadge from "./UserBadge";
import { centeringStyles } from "../theme.jsx";
import { IconButton } from "@mui/material";
import { GetApp, Visibility } from "@mui/icons-material";
import { Box, Stack } from "@mui/system";
import { shortEmail } from "../utiles";

const iuser = {
  name: "Ignacio",
  cuil: "11-37425457-8",
  lastname: "Romang",
  email: "ignacioromang@outlook.com",
  address: {
    street: "calle falsa",
    city: "ciudad falsa",
    state: "Inunda Fe",
  },
  phone: "+(12) 3214-645123",
};

function generateRandomName() {
  const adjectives = [
    "Red",
    "Blue",
    "Green",
    "Happy",
    "Sunny",
    "Brilliant",
    "Gentle",
    "Clever",
    "Kind",
  ];
  const nouns = [
    "Cat",
    "Dog",
    "Mountain",
    "Ocean",
    "Tree",
    "Sun",
    "Moon",
    "Star",
    "River",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}

const randomName = generateRandomName();

const ProfileIconData = () => {
  const [ae, setAe] = React.useState(false);

  const handleDownload = () => {
    // Lógica para descargar el PDF
    console.log("Descargando el PDF");
  };

  const handleView = () => {
    // Lógica para visualizar el PDF
    console.log("Visualizando el PDF");
  };
  return (
    <Box sx={centeringStyles}>
      <Stack sx={centeringStyles}>
        <UserBadge username={randomName} isActive={ae} />
        <Typography variant="body1" paddingRight={17} fontSize={10}>
          CUIL
        </Typography>
        <Typography variant="h5">{iuser.cuil}</Typography>
      </Stack>
      {ae && (
        <>
          <Divider />
          <Stack direction={"row"} sx={centeringStyles}>
            <Typography variant="body1" fontSize={14}>
              Comprobante
            </Typography>
            <IconButton onClick={handleDownload} aria-label="Descargar PDF">
              <GetApp />
            </IconButton>
            <IconButton onClick={handleView} aria-label="Visualizar PDF">
              <Visibility />
            </IconButton>
            city
          </Stack>
        </>
      )}
    </Box>
  );
};

export default ProfileIconData;
