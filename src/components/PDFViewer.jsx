import { Paper, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
s;
/* The code defines a functional component called `PDFViewer`. If u click in the infocard u will see the info of the pdf in this component*/

const PDFViewer = () => {
  const [pdf, setPdf] = React.useState([]);

  const { pdfid } = useParams();
  /* The `React.useEffect` hook is used to perform side effects in a functional component. In this case,
it is used to fetch the PDF data from the backend API. */
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.REACT_APP_BACK_URL;
        const response = await axios.post(url + "/api/resources/getpdf", {
          pdfId: pdfid,
        });
        setPdf(response.data);
      } catch (error) {
        console.error("Error fetching PDF viewer:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []);
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
