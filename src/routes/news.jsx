import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Fab from "@mui/material/Fab";
import { blue } from "@mui/material/colors";
import axios from "axios";
import { default as React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import PdfTable from "../components/PDFtable";
import TopBar from "../components/TopBar";
import { useService } from "../contexts/ServiceContext";
import ScrollableComponent from "../fragments/ScrollableComponent";
export default function News() {
  const [pdfs, setPdfs] = useState([null, null, null]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useService();
  const navigate = useNavigate();

  const handleHelpClick = () => {
    navigate("/faq");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.REACT_APP_BACK_URL;
        const response = await axios.get(url + "/api/resources/getpdflist");
        setPdfs(response.data);
      } catch (error) {
        console.error("Error fetching PDF:", error);
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const pdfCache = React.useMemo(() => pdfs, [pdfs]);

  return (
    <>
      <TopBar />
      <ScrollableComponent>
        <PdfTable pdfs={pdfCache} key={loading} />
      </ScrollableComponent>
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
    </>
  );
}
