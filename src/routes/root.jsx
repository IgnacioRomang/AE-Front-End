import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Fab } from "@mui/material";
import { blue } from "@mui/material/colors";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import { centeringStyles } from "../theme";

export default function Root() {
  const navigate = useNavigate();
  const [contentHeight, setContentHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const content = document.getElementById("scrollable-content");
    if (content) {
      setContentHeight(content.clientHeight);
    }
  }, []);

  const paddingBottom = Math.max(0, windowHeight - contentHeight);

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
          style={{
            backgroundColor: blue[800],
            color: "white",
          }}
          onClick={() => navigate("/faq")}
        >
          <HelpOutlineIcon sx={{ mr: 1 }} />
          {"Ayuda"}
        </Fab>
      </div>
    </React.Fragment>
  );
}
