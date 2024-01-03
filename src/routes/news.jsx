import axios from "axios";
import { default as React, useEffect, useState } from "react";
import PdfTable from "../components/PDFtable";
import TopBar from "../components/TopBar";
import ScrollableComponent from "../fragments/ScrollableComponent";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";

export default function News() {
  const [pdfs, setPdfs] = useState([null, null, null]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.REACT_APP_BACK_URL;
        const response = await axios.post(url + "/api/resources/getpdflist");
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
      <TopBar userAuth={isAuthenticated} />
      <ScrollableComponent>
        <div id="detail" style={{ padding: 50 }}>
          <PdfTable pdfs={pdfs} key={loading} />
        </div>
      </ScrollableComponent>
      <Footer />
    </>
  );
}
