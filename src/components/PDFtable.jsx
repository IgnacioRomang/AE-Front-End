import { Box, Grid, Pagination } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import { centeringStyles } from "../theme";
import InfoCard from "./InfoCard";
/**
 * This function takes in an array of PDFs and returns a view of 3 PDFs in a row.
 * @param {PDF[]} pdfs - An array of PDFs.
 * @returns {JSX.Element} A view of 3 PDFs in a row.
 */
const PdfTable = ({ pdfs }) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const itemsPerPage = isMediumScreen ? (isSmallScreen ? 1 : 2) : 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = pdfs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  /**
   * This function handles the page change event for the pagination component.
   * @param {React.ChangeEvent} _event - The page change event.
   * @param {number} page - The new page number.
   */
  const handlePageChange = (_event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visiblePdfs = pdfs.slice(startIndex, endIndex);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid container spacing={3} style={{ ...centeringStyles, width: "90vw" }}>
        {visiblePdfs.map((pdf, index) => (
          <Grid item key={index}>
            <InfoCard pdf={pdf} />
          </Grid>
        ))}
      </Grid>
      <Box mt={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default PdfTable;
