import React, { useState } from "react";
import { Grid, Pagination, Box, Container } from "@mui/material";
import InfoCard from "./InfoCard";
import { centeringStyles } from "../theme";

const PdfTable = ({ pdfs }) => {
  const itemsPerPage = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = pdfs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visiblePdfs = pdfs.slice(startIndex, endIndex);

  return (
    <Container sx={{ height: "80vh", width: "100vw" }}>
      <Grid
        container
        spacing={3}
        width={"100%"}
        sx={{ ...centeringStyles, height: "80vh", width: "90vw" }}
      >
        {visiblePdfs.map((pdf, index) => (
          <Grid item key={index}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <InfoCard state={pdf === null} pdf={pdf} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default PdfTable;
