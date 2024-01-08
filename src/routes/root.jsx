import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import { useAuth } from "../contexts/AuthContext";
import ScrollableComponent from "../fragments/ScrollableComponent";
import Fab from "@mui/material/Fab";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
export default function Root() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleHelpClick = () => {
    // Navegar a la página de preguntas frecuentes
    navigate("/faq");
  };

  return (
    <>
      <TopBar userAuth={isAuthenticated} />
      <ScrollableComponent>
        <div id="detail" style={{ padding: 25 }}>
          <Outlet />
        </div>
      </ScrollableComponent>
      <Footer />
      <Fab
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
