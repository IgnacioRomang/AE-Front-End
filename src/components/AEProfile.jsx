import { Skeleton, Typography } from "@mui/material";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext";
import { useProfileString } from "../contexts/TextProvider";
import ProfileAEdata from "../fragments/profile/ProfileInfo";
import Calendar from "../fragments/profile/Calendar";
import { centeringStyles } from "../theme";
import AlertFragment from "../fragments/AlertFragmet";

const Alert = lazy(() => import("@mui/material/Alert"));
const AlertTitle = lazy(() => import("@mui/material/AlertTitle"));
const Divider = lazy(() => import("@mui/material/Divider"));
const Grid = lazy(() => import("@mui/material/Grid"));
const Paper = lazy(() => import("@mui/material/Paper"));
const Stack = lazy(() => import("@mui/material/Stack"));

const AEProfile = () => {
  const { User, get_ae_dates, serverDates, AE } = useService();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      setLoading(true);
      let result = await get_ae_dates();
      setLoading(!result);
    } catch (error) {
      console.log("Error fetching data:", error);
      return false;
    }
  };

  useEffect(() => {
    if (!User) {
      navigate("/");
    }
    if (!serverDates) {
      setLoading(true);
      fetchData();
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [User, fetchData, navigate, serverDates]);

  const labels = useProfileString();

  return (
    <Suspense
      fallback={<Skeleton variant="rectangular" height={60} width={"100%"} />}
    >
      {User ? (
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
                  <AlertFragment
                    type={"warning"}
                    title={labels.warningfinish.title}
                    body={labels.warningfinish.body}
                  />
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
                <AlertFragment
                  type={"warning"}
                  title={labels.warning.title}
                  body={labels.warning.body}
                />
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

export default AEProfile;
