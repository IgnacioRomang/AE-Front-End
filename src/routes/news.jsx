import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Fab from "@mui/material/Fab";
import { blue } from "@mui/material/colors";
import axios from "axios";
import { default as React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import PdfTable from "../components/PDFtable";
import TopBar from "../components/TopBar";
import { useAuth } from "../contexts/AuthContext";
import ScrollableComponent from "../fragments/ScrollableComponent";

export default function News() {
  const [pdfs, setPdfs] = useState([null, null, null]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleHelpClick = () => {
    // Navegar a la página de preguntas frecuentes
    navigate("/faq");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.REACT_APP_BACK_URL;
        const response = await axios.get(url + "/api/resources/getpdflist");
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

  // Gatito si es 1 en 1 millón
  const base64Image =
    " data:image/jpeg;base64,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";
  const randomNumber = Math.floor(Math.random() * 1000000) + 1;
  const probability = 1;
  const shouldShowComponent = randomNumber <= probability;
  // Fin de Gatito si es 1 en 1 millón
  return (
    <>
      <TopBar userAuth={isAuthenticated} />
      <ScrollableComponent>
        <PdfTable pdfs={pdfs} key={loading} />
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
        {shouldShowComponent && (
          <img
            src={base64Image}
            alt="Ayuda"
            style={{
              marginLeft: 8,
              width: "65%",
              height: "65%",
              borderRadius: "50%",
            }}
          />
        )}
      </Fab>
    </>
  );
}
