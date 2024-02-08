import { Box, Grid, Pagination, Skeleton } from "@mui/material";
import React, { useState, Suspense } from "react";
import { centeringStyles } from "../theme";

const InfoCard = React.lazy(() => import("./InfoCard"));

/**
 * This function takes in an array of PDFs and returns a view of 3 PDFs in a row.
 * @param {PDF[]} pdfs - An array of PDFs.
 * @returns {JSX.Element} A view of 3 PDFs in a row.
 */
const PdfTable = ({ pdfs }) => {
  /* The code you provided is implementing pagination functionality for a table of PDFs. */
  const itemsPerPage = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = pdfs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  /**
   * This function handles the page change event for the pagination component.
   * @param {React.ChangeEvent} event - The page change event.
   * @param {number} page - The new page number.
   */
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visiblePdfs = pdfs.slice(startIndex, endIndex);
  return (
    <>
      <Grid
        container
        spacing={3}
        width={"90vw"}
        sx={{ ...centeringStyles, height: "100vh", width: "90vw" }}
      >
        {visiblePdfs.map((pdf, index) => (
          <Grid item key={index}>
            <Suspense
              fallback={
                <Skeleton
                  variant="rectangular"
                  height={"25vh"}
                  width={"30vw"}
                />
              }
            >
              <InfoCard state={pdf === null} pdf={pdf} />
            </Suspense>
          </Grid>
        ))}
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={3}
        position="sticky"
        bottom="0"
        bgcolor="white"
        padding={1}
        borderRadius={"40px"}
        zIndex={1}
        width={"100%"}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
};

export default PdfTable;
