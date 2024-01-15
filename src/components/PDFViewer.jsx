import { Paper, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

/**
 * This function is a React component that displays a PDF document.
 * @param {object} props - The properties of the component.
 * @param {string} props.pdfId - The ID of the PDF document to display.
 */
const PDFViewer = (props) => {
  const [pdf, setPdf] = React.useState([]);

  const { pdfId } = props;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.REACT_APP_BACK_URL;
        const response = await axios.post(url + "/api/resources/getpdf", {
          pdfId: pdfId,
        });
        setPdf(response.data);
      } catch (error) {
        console.error("Error fetching PDF viewer:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, [pdfId]);

  return (
    <Paper sx={{ width: "98vw", height: "98vh" }}>
      <Typography paddingTop={2} variant="h5">
        {pdf.title}
      </Typography>
      <iframe
        title="PDF Viewer"
        src={`data:application/pdf;base64,${pdf.content}`}
        width="100%"
        height="100%"
        style={{ border: "none" }}
      ></iframe>
    </Paper>
  );
};

export default PDFViewer;
