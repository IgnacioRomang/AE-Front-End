import { Box, Divider, Stack, Paper, Grid } from "@mui/material";
import React from "react";
import ProfileAEdata from "../fragments/ProfileIconData";
import ProfileData from "../fragments/ProfileData";
import Calendar from "../fragments/calendar/Calendar";
import { getDates } from "../utiles";
import { gridProfileStyle } from "../theme";
import { useProfileString } from "../contexts/TextProvider";

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
  ae: true,
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

const Profile = () => {
  const names = generateRandomName().split(" ");
  const iuser = {
    name: names[0],
    cuil: "11-37425457-8",
    lastname: names[1],
    email: "ignacioromang@outlook.com",
    address: {
      street: "calle falsa",
      city: "ciudad falsa",
      state: "Inunda Fe",
    },
    phone: "+(12) 3214-645123",
    ae: true,
  };

  const { startDay, fthMonth, sixMonth, lastMonth } = getDates();
  const labels = useProfileString();
  return (
    <Paper>
      <Grid container sx={gridProfileStyle}>
        <Grid item xs={12} sm={3}>
          <ProfileAEdata iuser={iuser} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileData iuser={iuser} />
        </Grid>
        <Grid item>
          <Divider flexItem />
          <Grid container paddingTop={2} spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Calendar
                intStart={startDay}
                intEnd={startDay}
                msg={labels.msg[0]}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Calendar
                intStart={fthMonth}
                intEnd={sixMonth}
                msg={labels.msg[1]}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Calendar
                intStart={
                  new Date(sixMonth.getFullYear(), sixMonth.getMonth(), 1)
                }
                intEnd={sixMonth}
                msg={labels.msg[1]}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Calendar
                intStart={lastMonth}
                intEnd={lastMonth}
                msg={labels.msg[2]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Profile;
