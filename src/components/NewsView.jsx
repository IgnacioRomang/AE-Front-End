import { Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePublicResources } from "../contexts/PublicResourcesContext";

/**
 * This function is a React component that displays a PDF document.
 * @param {object} props - The properties of the component.
 */
const NewsView = () => {
  const [pdf, setPdf] = useState([]);

  const { id } = useParams();
  const { fetch_news_pdf } = usePublicResources();

  const fetchData = useCallback(async () => {
    try {
      const news_pdf = await fetch_news_pdf(id);
      if (news_pdf) {
        setPdf(news_pdf);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, fetch_news_pdf, setPdf]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Paper sx={{ width: "98vw", height: "98vh" }}>
      <Typography paddingTop={2} variant="h5">
        {pdf.title}
      </Typography>
      <iframe
        title="PDF Viewer"
        src={`${process.env.REACT_APP_BACK_URL}${pdf.pdf}`}
        width="100%"
        height="100%"
        style={{ border: "none" }}
      ></iframe>
    </Paper>
  );
};

export default NewsView;
