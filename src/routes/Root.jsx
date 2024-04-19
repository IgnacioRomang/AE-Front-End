import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Box,
  CircularProgress,
  Fab,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import RootFooter from "../components/RootFooter";
import RootTopBar from "../components/RootTopBar";
import { centeringStyles } from "../theme";

export default function Root() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <RootTopBar />
      <Box
        id="scrollable-content"
        sx={{
          paddingTop: 5,
          paddingBottom: 5,
          minHeight: "70vh",
          maxHeight: "160vh",
          overflow: "auto",
          ...centeringStyles,
        }}
      >
        <Suspense
          fallback={
            <Paper>
              <Stack
                padding={4}
                direction="column"
                sx={centeringStyles}
                spacing={2}
              >
                <CircularProgress />
                <Typography>Cargando...</Typography>
              </Stack>
            </Paper>
          }
        >
          <Outlet/>
        </Suspense>
      </Box>
      <RootFooter />
      <div style={{ position: "fixed", bottom: 16, right: 16 }}>
        <Fab
          size="medium"
          aria-label="Ayuda"
          variant="extended"
          onClick={() => navigate("/faq")}
          style={{
            backgroundColor: blue[800],
            color: "white",
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
        >
          <HelpOutlineIcon sx={{ mr: 1 }} />
          {"Ayuda"}
        </Fab>
      </div>
    </React.Fragment>
  );
}
