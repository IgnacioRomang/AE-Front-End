import { Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import React, { lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmailVerifyProvider } from "../contexts/EmailVerifyContext";
import { useService } from "../contexts/ServiceContext";
import { useComponentAEProfileString } from "../contexts/TextProvider";
import AlertFragment from "../fragments/AlertFragmet";
import Calendar from "../fragments/profile/Calendar";
import CustomChip from "../fragments/profile/PofileCustomChip";
import ProfileInfo from "../fragments/profile/ProfileInfo";
import { centeringStyles } from "../theme";
import { isSameMonth } from "../utiles";

const Divider = lazy(() => import("@mui/material/Divider"));
const Grid = lazy(() => import("@mui/material/Grid"));
const Paper = lazy(() => import("@mui/material/Paper"));
const Stack = lazy(() => import("@mui/material/Stack"));

const AEProfile = () => {
  const { User, serverDates, AE } = useService();
  const navigate = useNavigate();

  useEffect(() => {
    if (!User) {
      navigate("/");
    }
  }, [User, navigate, serverDates]);

  const labels = useComponentAEProfileString();

  return (
    <div>
      {User ? (
        <Grid
          container
          spacing={2}
          padding={User.ae !== AE.NON_AE ? 0 : 8}
          sx={centeringStyles}
        >
          <Grid item>
            <Stack spacing={2} sx={centeringStyles}>
              <EmailVerifyProvider>
                <ProfileInfo />
              </EmailVerifyProvider>

              {User.ae === AE.FINALIZED && (
                <AlertFragment
                  type={"warning"}
                  title={labels.calendar.alert_warning_finalize_onprocess.title}
                  body={labels.calendar.alert_warning_finalize_onprocess.body}
                />
              )}
            </Stack>
          </Grid>

          <Grid item>
            {User.ae !== AE.NON_AE ? (
              <Paper>
                <Stack
                  padding={2}
                  spacing={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    container
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Typography variant="h4">
                      {labels.calendar.title}
                    </Typography>
                    <Divider />
                  </Grid>

                  <Grid
                    container
                    spacing={2}
                    sx={{
                      ...centeringStyles,
                      maxHeight: "90vh",
                      paddingBottom: 4,
                      overflow: "auto",
                    }}
                  >
                    <Grid key={"0"} item>
                      <Calendar
                        key={"0-calendar"}
                        intStart={serverDates.startDay}
                        intEnd={serverDates.startDay}
                        msg={labels.calendar.tooltip[0]}
                      />
                    </Grid>

                    {serverDates.hasOwnProperty("fifthMonth") && (
                      <Grid key={"1"} item>
                        <Calendar
                          key={"1-calendar"}
                          intStart={serverDates.fifthMonth}
                          intEnd={serverDates.sixthMonth}
                          msg={labels.calendar.tooltip[1]}
                        />
                      </Grid>
                    )}

                    {serverDates.hasOwnProperty("fifthMonth") &&
                      !isSameMonth(
                        serverDates.fifthMonth,
                        serverDates.sixthMonth
                      ) && (
                        <Grid key={"2"} item>
                          <Calendar
                            key={"2-calendar"}
                            intStart={serverDates.sixthMonth}
                            intEnd={serverDates.fifthMonth}
                            msg={labels.calendar.tooltip[1]}
                          />
                        </Grid>
                      )}

                    <Grid key={"3"} item>
                      <Calendar
                        key={"3-calendar"}
                        intStart={serverDates.lastMonth}
                        intEnd={serverDates.lastMonth}
                        msg={labels.calendar.tooltip[2]}
                      />
                    </Grid>
                  </Grid>

                  <Divider />

                  <Grid container sx={centeringStyles}>
                    <Grid item>
                      <CustomChip
                        paddingTop={3}
                        text={labels.calendar.chip[0]}
                        color={blue[200]}
                      />
                    </Grid>
                    <Grid item>
                      {serverDates.hasOwnProperty("fifthMonth") && (
                        <CustomChip
                          text={labels.calendar.chip[1]}
                          color={red[200]}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Stack>
              </Paper>
            ) : (
              <AlertFragment
                type={"warning"}
                title={labels.calendar.alert_warning_finish.title}
                body={labels.calendar.alert_warning_finish.body}
              />
            )}
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AEProfile;
