import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, Fab } from "@mui/material";
import { blue } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import PdfTable from "../components/PDFtable";
import TopBar from "../components/TopBar";
import { centeringStyles } from "../theme";

const API_URL = process.env.REACT_APP_BACK_URL;

const News = () => {
  const [pdfs, setPdfs] = useState([]);
  const navigate = useNavigate();

  const handleHelpClick = () => {
    navigate("/faq");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/resources/getpdflist`);
        setPdfs(response.data);
      } catch (error) {
        console.error("Error fetching PDF:", error);
        // Handle error if needed
      }
    };

    fetchData();
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
        {pdfs.length > 0 && <PdfTable pdfs={pdfs} />}
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
