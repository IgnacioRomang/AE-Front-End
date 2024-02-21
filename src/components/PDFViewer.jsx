import { Paper, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useService } from "../contexts/ServiceContext";

/**
 * This function is a React component that displays a PDF document.
 * @param {object} props - The properties of the component.
 */
const PDFViewer = () => {
  const [pdf, setPdf] = React.useState([]);
  const { fetch_news_pdf } = useService();

  const { id } = useParams();
  React.useEffect(() => {
    try {
      fetch_news_pdf(id).then((res) => {
        if (res.status === 200) {
          setPdf(res.data);
        }
      });
    } catch (error) {
      console.error("Error fetching PDF viewer:", error);
      // Handle error if needed
    }
  }, [id]);

  return (
    <Paper sx={{ width: "98vw", height: "98vh" }}>
      <Typography paddingTop={2} variant="h5">
        {pdf.title}
      </Typography>
      <iframe
        title="PDF Viewer"
        src={process.env.REACT_APP_BACK_URL + pdf.pdf}
        width="100%"
        height="100%"
        style={{ border: "none" }}
      ></iframe>
    </Paper>
  );
};

export default PDFViewer;
