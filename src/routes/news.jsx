import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, Fab } from "@mui/material";
import { blue } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NewsTable from "../components/NewsTable";
import TopBar from "../components/TopBar";
import { centeringStyles } from "../theme";
import { useService } from "../contexts/ServiceContext";

const News = () => {
  const [newss, setNews] = useState([]);
  const navigate = useNavigate();
  const { fetch_news } = useService();

  const handleHelpClick = () => {
    navigate("/faq");
  };

  useEffect(() => {
    try {
      fetch_news().then((response) => {
        if (response.status === 200) {
          setNews(response.data);
        }
      });
    } catch (error) {
      console.error("Error fetching News:", error);
      // Handle error if needed
    }
  }, []);

  return (
    <React.Fragment>
      <TopBar />
      <Box
        sx={{
          minHeight: "75vh",
          maxHeight: "100vh",
          padding: 5,
          display: "flex",
          ...centeringStyles,
        }}
      >
        {newss.length > 0 && <NewsTable newss={newss} />}
      </Box>
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
    </React.Fragment>
  );
};

export default News;
