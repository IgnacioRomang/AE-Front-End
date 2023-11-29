import { Box, Divider, Stack, Paper, Grid } from "@mui/material";
import React from "react";
import ProfileAEdata from "../fragments/ProfileIconData";
import ProfileData from "../fragments/ProfileData";
import Calendar from "../fragments/calendar/Calendar";
import { getDates } from "../utiles";

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
      width: "90vw", // Altura para tamaños grandes de pantalla (md)
    },

    "@media (min-width: 1281px) and (max-width: 1920px)": {
      // pantalla 1080
      width: "65vw", // Altura para tamaños extra grandes de pantalla (lg)
    },

    "@media (min-width: 1921px)": {
      width: "55vw", // Altura para tamaños muy grandes de pantalla (xl)
    },
  };
  const { startDay, fthMonth, sixMonth, lastMonth } = getDates();
  return (
    <Paper>
      <Grid
        container
        spacing={2}
        padding={2}
        sx={sx}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={3}>
          <ProfileAEdata />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileData />
        </Grid>
        <Grid item>
          <Divider flexItem />
          <Grid container paddingTop={2} spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Calendar
                intStart={startDay}
                intEnd={startDay}
                msg={"Inicio de AE"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Calendar
                intStart={fthMonth}
                intEnd={sixMonth}
                msg={"PUede Baja AE"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Calendar
                intStart={
                  new Date(sixMonth.getFullYear(), sixMonth.getMonth(), 1)
                }
                intEnd={sixMonth}
                msg={"Puede Baja AE"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Calendar
                intStart={lastMonth}
                intEnd={lastMonth}
                msg={"Fin AE"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Profile;
