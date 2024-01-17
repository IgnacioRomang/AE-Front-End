import { Paper, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

/**
 * This function is a React component that displays a PDF document.
 * @param {object} props - The properties of the component.
 */
const PDFViewer = (props) => {
  const [pdf, setPdf] = React.useState([]);

  const { id } = useParams();
  console.log(id);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.REACT_APP_BACK_URL;
        const response = await axios.post(url + "/api/resources/getpdf", {
          id: id,
        });
        console.log(response.data);
        setPdf(response.data);
      } catch (error) {
        console.error("Error fetching PDF viewer:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, [id]);

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
