import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfTable from "../components/PDFtable";
import ScrollableComponent from "../fragments/ScrollableComponent";
import {
  Alert,
  AlertTitle,
  Backdrop,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useProfileString } from "../contexts/TextProvider";
import ProfileAEdata from "../fragments/ProfileIconData";
import Calendar from "../fragments/calendar/Calendar";
import { centeringStyles, gridProfileStyle } from "../theme";

const Profile = (props) => {
  const { User, setUser, serverDates, setServerDates } = useAuth();
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    let url = process.env.REACT_APP_BACK_URL;
    const fetchData = async () => {
      try {
        const response = await axios.post(`${url}/api/ae/aedates`);
        if (!response.data.startDay) {
          let u = User;
          u.ae = false;
          setUser(u);
        } else {
          let u = User;
          u.ae = true;
          setUser(u);
        }
        setServerDates({
          startDay: new Date(response.data.startDay),
          fifthMonth: new Date(response.data.fifthMonth),
          sixthMonth: new Date(response.data.sixthMonth),
          lastMonth: new Date(response.data.lastMonth),
        });

        setLoading(false);
      } catch (error) {
        // Manejar errores aquí
        // ... (código existente)
      }
    };

    fetchData();
  }, [User, setUser]);

  const labels = useProfileString();

  return (
    <Grid container spacing={2} padding={User.ae ? 0 : 8} sx={centeringStyles}>
      <Grid item xs={12} md={3}>
        <ProfileAEdata iuser={User} />
      </Grid>
      {User.ae ? (
        <Grid item xs={12} md={6}>
          <Paper>
            <Grid container padding={1}>
              <Grid item xs={12}>
                {loading ? (
                  <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
                ) : (
                  <Typography padding={1} variant="h5">
                    {labels.calendar}
                  </Typography>
                )}
                <Divider />
              </Grid>
              <Grid
                container
                paddingTop={3}
                spacing={4}
                sx={{ justifyContent: "center" }}
              >
                {[0, 1].map((index) => (
                  <Grid key={index} item xs={12} sm={6} md={5}>
                    {loading ? (
                      <Skeleton variant="rounded" width={200} height={150} />
                    ) : (
                      <Calendar
                        intStart={
                          serverDates[index === 1 ? "fifthMonth" : "startDay"]
                        }
                        intEnd={
                          serverDates[index === 1 ? "sixthMonth" : "startDay"]
                        }
                        msg={labels.msg[index]}
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
              <Grid container paddingTop={2} spacing={4} sx={centeringStyles}>
                {[2, 3].map((index) => (
                  <Grid key={index} item xs={12} sm={6} md={5}>
                    {loading ? (
                      <Skeleton variant="rounded" width={200} height={150} />
                    ) : (
                      <Calendar
                        intStart={
                          index === 2
                            ? new Date(
                                serverDates.sixthMonth.getFullYear(),
                                serverDates.sixthMonth.getMonth(),
                                1
                              )
                            : serverDates["lastMonth"]
                        }
                        intEnd={
                          index === 2
                            ? serverDates.sixthMonth
                            : serverDates["lastMonth"]
                        }
                        msg={labels.msg[index - 1]}
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ) : (
        <Grid item xs={12} md={6}>
          <Alert padding={5} severity="warning">
            <AlertTitle variant="h4"> {labels.warning.title} </AlertTitle>
            {labels.warning.body.map((label, index) => (
              <Typography key={index} paddingTop={1}>
                {label}
              </Typography>
            ))}
          </Alert>
        </Grid>
      )}
    </Grid>
  );
};

export default Profile;
