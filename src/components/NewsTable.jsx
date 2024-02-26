import { Box, Grid, Pagination } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import { centeringStyles } from "../theme";
import InfoCard from "./InfoCard";
/**
 * This function takes in an array of PDFs and returns a view of 3 PDFs in a row.
 * @param {PDF[]} news - An array of news objects, each representing a PDFs.
 * @returns {JSX.Element} A view of 3 PDFs in a row.
 */
const NewsTable = ({ news }) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const itemsPerPage = isMediumScreen ? (isSmallScreen ? 1 : 2) : 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = news.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleNewss = news.slice(startIndex, endIndex);

  const handlePageChange = (_event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid container spacing={3} style={{ ...centeringStyles, width: "90vw" }}>
        {visibleNewss.map((element, index) => (
          <Grid item key={index}>
            <InfoCard anews={element} />
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

export default NewsTable;
