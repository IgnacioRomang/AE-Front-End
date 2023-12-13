import { Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useProfileString } from "../contexts/TextProvider";
import ProfileData from "../fragments/ProfileData";
import ProfileAEdata from "../fragments/ProfileIconData";
import Calendar from "../fragments/calendar/Calendar";
import { centeringStyles, gridProfileStyle } from "../theme";
import { getDates } from "../utiles";

const Profile = (props) => {
  const { User } = useAuth();
  const iuser = User;
  const { startDay, fthMonth, sixMonth, lastMonth } = getDates();
  const labels = useProfileString();
  return (
    <Paper>
      <Grid spacing={2} padding={1} container sx={gridProfileStyle}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={4} sx={centeringStyles}>
            <Grid item xs={12} sm={4}>
              <ProfileAEdata iuser={iuser} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ProfileData iuser={iuser} />
            </Grid>
          </Grid>
        </Grid>
        {iuser.ae && (
          <Grid item paddingBottom={2}>
            <Divider flexItem />
            <Typography paddingTop={1} variant="h5">
              {" "}
              {labels.calendar}
            </Typography>

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
        )}
      </Grid>
    </Paper>
  );
};

export default Profile;
