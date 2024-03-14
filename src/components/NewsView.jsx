import { Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useService } from "../contexts/ServiceContext";

/**
 * This function is a React component that displays a PDF document.
 * @param {object} props - The properties of the component.
 */
const NewsView = () => {
  const [pdf, setPdf] = React.useState([]);

  const { id } = useParams();
  const { fetch_news_pdf } = useService();

  useEffect(() => {
    (async () => {
      try {
        const news_pdf = await fetch_news_pdf(id);
        if (news_pdf) {
          setPdf(news_pdf);
        }
      } catch (error) {
        // // handle error
        console.log(error);
      }
    })();
  }, [id]);

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
