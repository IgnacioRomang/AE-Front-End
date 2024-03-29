import { Skeleton, Typography } from "@mui/material";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext";
import { useComponentAEProfileString } from "../contexts/TextProvider";
import AlertFragment from "../fragments/AlertFragmet";
import Calendar from "../fragments/profile/Calendar";
import ProfileInfo from "../fragments/profile/ProfileInfo";
import { centeringStyles } from "../theme";
import { blue, red } from "@mui/material/colors";
import CustomChip from "../fragments/profile/PofileCustomChip";
import { EmailVerifyProvider } from "../contexts/EmailVerifyContext";

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
  }, [User, navigate, serverDates]);

  const labels = useComponentAEProfileString();

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
              <EmailVerifyProvider>
                <ProfileInfo />
              </EmailVerifyProvider>

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
                    title={labels.alert_warning_finalize_onprocess.title}
                    body={labels.alert_warning_finalize_onprocess.body}
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
                          {labels.calendar.title}
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
                            msg={labels.calendar.tooltip[0]}
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
                              msg={labels.calendar.tooltip[1]}
                            />
                          )}
                        </Grid>
                      )}

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
                                msg={labels.calendar.tooltip[1]}
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
                            msg={labels.calendar.tooltip[2]}
                          />
                        )}
                      </Grid>
                    </Grid>

                    <Grid container padding={1}>
                      <Grid item xs={12}>
                        <Divider />
                        <CustomChip
                          paddingTop={3}
                          text={labels.calendar.chip[0]}
                          color={blue[200]}
                        />
                      </Grid>
                      {serverDates.hasOwnProperty("fifthMonth") && (
                        <Grid item xs={12}>
                          <CustomChip
                            text={labels.calendar.chip[1]}
                            color={red[200]}
                          />
                        </Grid>
                      )}
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
                  title={labels.calendar.alert_warning_finish.title}
                  body={labels.calendar.alert_warning_finish.body}
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
