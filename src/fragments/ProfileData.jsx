import { Grid, TextField } from "@mui/material";
import React from "react";
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

const ProfileData = () => {
  return (
    <Grid
      container
      paddingLeft={2}
      paddingTop={4}
      paddingBottom={2}
      display={"flex"}
      spacing={1}
    >
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          id="standard-disabled"
          label="Nombre"
          defaultValue={iuser.name}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          id="standard-disabled"
          label="Apellido"
          defaultValue={iuser.lastname}
          variant="standard"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          id="standard-disabled"
          label="Email"
          defaultValue={shortEmail(iuser.email)}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          id="standard-disabled"
          label="Telefono"
          defaultValue={iuser.phone}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          id="standard-disabled"
          label="Provincia"
          defaultValue={iuser.address.state}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          id="standard-disabled"
          label="Ciudad"
          defaultValue={iuser.address.city}
          variant="standard"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          id="standard-disabled"
          label="Domicilio"
          defaultValue={iuser.address.street}
          variant="standard"
        />
      </Grid>
    </Grid>
  );
};

export default ProfileData;
