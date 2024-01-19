import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Fab from "@mui/material/Fab";
import { blue } from "@mui/material/colors";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import ScrollableComponent from "../fragments/ScrollableComponent";
export default function Root() {
  const navigate = useNavigate();

  const handleHelpClick = () => {
    // Navegar a la página de preguntas frecuentes
    navigate("/faq");
  };

  return (
    <>
      <TopBar />
      <ScrollableComponent>
        <Outlet />
      </ScrollableComponent>
      <Footer />
      <Fab
        size="medium"
        aria-label="Ayuda"
        variant="extended"
        style={{
          backgroundColor: blue[800],
          color: "white",
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={handleHelpClick}
      >
        <HelpOutlineIcon sx={{ mr: 1 }} />
        {"Ayuda"}
      </Fab>
    </>
  );
}
