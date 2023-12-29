import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfTable from "../components/PDFtable";
import ScrollableComponent from "../fragments/ScrollableComponent";
import { Backdrop, CircularProgress } from "@mui/material";
import { backdropLoginStyle } from "../theme";

export default function News() {
  const [pdfs, setPdfs] = useState([null, null, null]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.REACT_APP_BACK_URL;
        const response = await axios.post(url + "/api/pdf/getpdflist");
        const sortedPdfs = response.data.sort((a, b) => a.id - b.id);
        setPdfs(sortedPdfs);
      } catch (error) {
        console.error("Error fetching PDF:", error);
        // Handle error if needed
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PdfTable pdfs={pdfs} key={loading} />
    </>
  );
}
