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

const API_URL = process.env.REACT_APP_BACK_URL;

const News = () => {
  const [fetchNews, setFetchNews] = useState([]);
  const navigate = useNavigate();
  const { fetch_news_list } = useService();
  const handleHelpClick = () => {
    navigate("/faq");
  };

  useEffect(() => {
    (async () => {
      try {
        const fetch_news = await fetch_news_list();
        if (fetch_news) {
          setFetchNews(fetch_news);
        }
      } catch (error) {
        // // handle error
        console.log(error);
      }
    })();
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
        {fetchNews.length > 0 && <NewsTable news={fetchNews} />}
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
