import { Skeleton, Typography } from "@mui/material";
import { default as React, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext";
import { useProfileString } from "../contexts/TextProvider";
import ProfileAEdata from "../fragments/ProfileIconData";
import Calendar from "../fragments/calendar/Calendar";
import { centeringStyles } from "../theme";
import { grey } from "@mui/material/colors";

// Importar los componentes de Material-UI de forma perezosa
const Alert = React.lazy(() => import("@mui/material/Alert"));
const AlertTitle = React.lazy(() => import("@mui/material/AlertTitle"));
const Divider = React.lazy(() => import("@mui/material/Divider"));
const Grid = React.lazy(() => import("@mui/material/Grid"));
const Paper = React.lazy(() => import("@mui/material/Paper"));
const Stack = React.lazy(() => import("@mui/material/Stack"));

/**
 * The `Profile` component is a functional component in JavaScript React. It is responsible for
 * rendering the user's profile page.
 *
 * @param {object} props - The props passed to the component
 * @returns {JSX.Element} The Profile component
 */
const Profile = () => {
  const { User, get_ae_dates, serverDates, AE } = useService();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      setLoading(true);
      let result = await get_ae_dates();
      setLoading(!result);
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
  }, [User, get_ae_dates, navigate, serverDates]);

  const labels = useProfileString();

  return (
    <Suspense
      fallback={<Skeleton variant="rectangular" height={60} width={"100%"} />}
    >
      {User !== null ? (
        <Grid
          container
          spacing={2}
          padding={User.ae !== AE.NON_AE ? 0 : 8}
          sx={centeringStyles}
        >
          <Grid item xs={12} md={3}>
            <Stack spacing={2} sx={centeringStyles}>
              <ProfileAEdata iuser={User} />

              {User.ae === AE.FINALIZED && (
                <Suspense
                  fallback={
                    <Skeleton
                      variant="rectangular"
                      height={60}
                      width={"100%"}
                    />
                  }
                >
                  <Alert severity="warning">
                    <AlertTitle variant="h5">
                      {labels.warningfinish.title}
                    </AlertTitle>
                    {labels.warningfinish.body.map((label, index) => (
                      <Typography key={index} paddingTop={1}>
                        {label}
                      </Typography>
                    ))}
                  </Alert>
                </Suspense>
              )}
            </Stack>
          </Grid>
          {User.ae !== AE.NON_AE ? (
            <Grid item xs={12} md={6}>
              <Suspense
                fallback={<Skeleton variant="text" sx={{ fontSize: "3rem" }} />}
              >
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
                      <Grid key={0} item xs={12} sm={7} md={6}>
                        {loading ? (
                          <Skeleton
                            variant="rounded"
                            width={200}
                            height={150}
                          />
                        ) : (
                          <Calendar
                            intStart={serverDates.startDay}
                            intEnd={serverDates.startDay}
                            msg={labels.msg[0]}
                          />
                        )}
                      </Grid>
                      {serverDates.hasOwnProperty("fifthMonth") && (
                        <Grid key={1} item xs={12} sm={7} md={6}>
                          {loading ? (
                            <Skeleton
                              variant="rounded"
                              width={200}
                              height={150}
                            />
                          ) : (
                            <Calendar
                              intStart={serverDates.fifthMonth}
                              intEnd={serverDates.sixthMonth}
                              msg={labels.msg[1]}
                            />
                          )}
                        </Grid>
                      )}
                    </Grid>
                    <Grid
                      container
                      paddingTop={3}
                      paddingBottom={3}
                      spacing={4}
                      sx={centeringStyles}
                    >
                      {serverDates.hasOwnProperty("fifthMonth") &&
                        serverDates.fifthMonth.getMonth() !==
                          serverDates.sixthMonth.getMonth() && (
                          <Grid key={2} item xs={12} sm={7} md={6}>
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
                      <Grid key={3} item xs={12} sm={7} md={6}>
                        {loading ? (
                          <Skeleton
                            variant="rounded"
                            width={200}
                            height={150}
                          />
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
              </Suspense>
            </Grid>
          ) : (
            <Grid item xs={12} md={6}>
              <Suspense
                fallback={
                  <Skeleton variant="rectangular" height={60} width={"100%"} />
                }
              >
                <Alert padding={5} severity="warning">
                  <AlertTitle variant="h4"> {labels.warning.title} </AlertTitle>
                  {labels.warning.body.map((label, index) => (
                    <Typography key={index} paddingTop={1}>
                      {label}
                    </Typography>
                  ))}
                </Alert>
              </Suspense>
            </Grid>
          )}
        </Grid>
      ) : (
        <></>
      )}
    </Suspense>
  );
};

export default Profile;
