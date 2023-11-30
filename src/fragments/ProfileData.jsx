import { Grid, TextField } from "@mui/material";
import React from "react";
import { shortEmail } from "../utiles";

const ProfileData = ({ iuser }) => {
  return (
    <Grid
      container
      paddingLeft={2}
      paddingTop={4}
      paddingBottom={2}
      paddingRight={2}
      display={"flex"}
      spacing={2}
    >
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
