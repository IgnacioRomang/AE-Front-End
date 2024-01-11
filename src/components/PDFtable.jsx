import { Box, Container, Grid, Pagination } from "@mui/material";
import React, { useState } from "react";
import { centeringStyles } from "../theme";
import InfoCard from "./InfoCard";

/* The code provided is defining a functional component called `PdfTable`. This component takes in a
prop called `pdfs`, which is an array of PDFs and build a view 3x1 InfoCards */
const PdfTable = ({ pdfs }) => {
  /* The code you provided is implementing pagination functionality for a table of PDFs. */
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
