import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, Fab } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import { centeringStyles } from "../theme";

export default function Root() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <TopBar />
      <Box
        id="scrollable-content"
        sx={{
          minHeight: "75vh",
          maxHeight: "150vh",
          padding: 5,
          display: "flex",
          ...centeringStyles,
        }}
      >
        <Outlet />
      </Box>
      <Footer />
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
