import {
  Alert,
  AlertTitle,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useService } from "../contexts/ServiceContext";
import { useProfileString } from "../contexts/TextProvider";
import ProfileAEdata from "../fragments/ProfileIconData";
import Calendar from "../fragments/calendar/Calendar";
import { centeringStyles } from "../theme";
import { useNavigate } from "react-router-dom";

/**
 * The `Profile` component is a functional component in JavaScript React. It is responsible for
 * rendering the user's profile page.
 *
 * @param {object} props - The props passed to the component

 * @returns {JSX.Element} The Profile component
 */
const Profile = (props) => {
  const { User, getAEdates, serverDates } = useService();
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      setLoading(true);
      let result = await getAEdates();

      setLoading(false);
    } catch (error) {
      // Manejar errores aquí
      // ... (código existente)
    }
  };
  /**
   * The `React.useEffect` hook is used to perform side effects in a functional component. In this case,
   * it is used to fetch data from an API endpoint when the component mounts.
   */
  React.useEffect(() => {
    if (User === null) {
      navigate("/");
    }
    if (serverDates === null) {
      setLoading(true);
      fetchData();
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [User, getAEdates, navigate]);

  const labels = useProfileString();

  return (
    <>
      {User !== null ? (
        <Grid
          container
          spacing={2}
          padding={User.ae ? 0 : 8}
          sx={centeringStyles}
        >
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
                    <Grid key={0} item xs={12} sm={6} md={5}>
                      {loading ? (
                        <Skeleton variant="rounded" width={200} height={150} />
                      ) : (
                        <Calendar
                          intStart={serverDates.startDay}
                          intEnd={serverDates.startDay}
                          msg={labels.msg[0]}
                        />
                      )}
                    </Grid>
                    <Grid key={1} item xs={12} sm={6} md={5}>
                      {loading ? (
                        <Skeleton variant="rounded" width={200} height={150} />
                      ) : (
                        <Calendar
                          intStart={serverDates.fifthMonth}
                          intEnd={serverDates.sixthMonth}
                          msg={labels.msg[1]}
                        />
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    paddingTop={3}
                    paddingBottom={3}
                    spacing={4}
                    sx={centeringStyles}
                  >
                    {serverDates.fifthMonth.getMonth() !==
                      serverDates.sixthMonth.getMonth() && (
                      <Grid key={2} item xs={12} sm={6} md={5}>
                        {loading ? (
                          <Skeleton
                            variant="rounded"
                            width={200}
                            height={150}
                          />
                        ) : (
                          <Calendar
                            key={3}
                            intStart={serverDates.sixthMonth}
                            intEnd={serverDates.fifthMonth}
                            msg={labels.msg[1]}
                          />
                        )}
                      </Grid>
                    )}
                    <Grid key={3} item xs={12} sm={6} md={5}>
                      {loading ? (
                        <Skeleton variant="rounded" width={200} height={150} />
                      ) : (
                        <Calendar
                          key={3}
                          intStart={serverDates.lastMonth}
                          intEnd={serverDates.lastMonth}
                          msg={labels.msg[2]}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={12} md={6}>
              {User.ae !== null && (
                <Alert padding={5} severity="warning">
                  <AlertTitle variant="h4"> {labels.warning.title} </AlertTitle>
                  {labels.warning.body.map((label, index) => (
                    <Typography key={index} paddingTop={1}>
                      {label}
                    </Typography>
                  ))}
                </Alert>
              )}
            </Grid>
          )}
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
