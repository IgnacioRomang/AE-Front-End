import axios from "axios";
import React from "react";
import PdfTable from "../components/PDFtable";
import ScrollableComponent from "../fragments/ScrollableComponent";

export default function News() {
  const [pdfs, setPdfs] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.REACT_APP_BACK_URL;
        const response = await axios.post(url + "/api/pdf/getpdflist");
        const sortedPdfs = response.data.sort((a, b) => a.id - b.id);
        setPdfs(sortedPdfs);
      } catch (error) {
        console.error("Error fetching PDF:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

  //TODO HACER EL LOADING
  return <PdfTable pdfs={pdfs} />;
}
