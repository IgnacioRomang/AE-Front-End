import { Divider, Grid, Paper, Skeleton, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useProfileString } from "../contexts/TextProvider";
import ProfileData from "../fragments/ProfileData";
import ProfileAEdata from "../fragments/ProfileIconData";
import Calendar from "../fragments/calendar/Calendar";
import { centeringStyles, gridProfileStyle } from "../theme";
import { getDates } from "../utiles";
import axios from "axios";

const Profile = (props) => {
  const { User } = useAuth();
  const iuser = User;
  const [loading, setLoading] = React.useState(true);
  const [serverDates, setServerDates] = React.useState({
    startDay: new Date(),
    fifthMonth: new Date(),
    sixthMonth: new Date(),
    lastMonth: new Date(),
  });

  React.useEffect(() => {
    let url = process.env.REACT_APP_BACK_URL;
    const fetchData = async () => {
      try {
        const response = await axios.post(`${url}/api/ae/aedates`);
        setServerDates({
          startDay: new Date(response.data.startDay),
          fifthMonth: new Date(response.data.fifthMonth),
          sixthMonth: new Date(response.data.sixthMonth),
          lastMonth: new Date(response.data.lastMonth),
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Manejar el error según sea necesario
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const labels = useProfileString();
  return (
    <Paper>
      <Grid spacing={2} padding={1} container sx={gridProfileStyle}>
        <Grid item xs={12} lg={8} sm={6} sx={centeringStyles}>
          <ProfileAEdata iuser={iuser} />
        </Grid>
        {iuser.ae && (
          <Grid item paddingBottom={2}>
            <Divider flexItem />
            {loading ? (
              <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
            ) : (
              <Typography paddingTop={1} variant="h5">
                {labels.calendar}
              </Typography>
            )}

            <Grid container paddingTop={2} spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                {loading ? (
                  <Skeleton variant="rounded" width={200} height={200} />
                ) : (
                  <Calendar
                    intStart={serverDates.startDay}
                    intEnd={serverDates.startDay}
                    msg={labels.msg[0]}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {loading ? (
                  <Skeleton variant="rounded" width={200} height={200} />
                ) : (
                  <Calendar
                    intStart={serverDates.fifthMonth}
                    intEnd={serverDates.sixthMonth}
                    msg={labels.msg[1]}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {loading ? (
                  <Skeleton variant="rounded" width={200} height={200} />
                ) : (
                  <Calendar
                    intStart={
                      new Date(
                        serverDates.sixthMonth.getFullYear(),
                        serverDates.sixthMonth.getMonth(),
                        1
                      )
                    }
                    intEnd={serverDates.sixthMonth}
                    msg={labels.msg[1]}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {loading ? (
                  <Skeleton variant="rounded" width={200} height={200} />
                ) : (
                  <Calendar
                    intStart={serverDates.lastMonth}
                    intEnd={serverDates.lastMonth}
                    msg={labels.msg[2]}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Profile;
