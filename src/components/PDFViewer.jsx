import { Paper, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const PDFViewer = () => {
  const [pdf, setPdf] = React.useState([]);
  //TODO leer pdf de back end
  const { pdfid } = useParams();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.REACT_APP_BACK_URL;
        const response = await axios.post(url + "/api/pdf/getpdf", {
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
    <Paper>
      <div style={{ width: "100vw", height: "100vh" }}>
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
      </div>
    </Paper>
  );
};

export default PDFViewer;
