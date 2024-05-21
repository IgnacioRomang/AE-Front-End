import { Box, Grid, Pagination, Stack, debounce } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePublicResources } from "../contexts/PublicResourcesContext";
import { centeringStyles } from "../theme.jsx";
import NewsCard from "./NewsCard.jsx";
/**
 * This function takes in an array of PDFs and returns a view of 3 PDFs in a row.
 * @param {PDF[]} news - An array of news objects, each representing a PDFs.
 * @returns {JSX.Element} A view of 3 PDFs in a row.
 */
const NewsTable = () => {
  const [fetchNews, setFetchNews] = useState([]);
  const theme = useTheme();

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const itemsPerPage = isMediumScreen ? (isSmallScreen ? 1 : 2) : 3;

  const { fetch_news_list } = usePublicResources();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);

  const visibleNewss = useMemo(
    () => fetchNews.slice(startIndex, endIndex),
    [fetchNews, startIndex, endIndex]
  );
  //const totalItems = fetchNews.length;
  const [totalItems, setTotalItems] = useState(0);
  //const totalPages = Math.ceil(totalItems / itemsPerPage);
  //const startIndex = (currentPage - 1) * itemsPerPage;
  //const endIndex = startIndex + itemsPerPage;
  //const visibleNewss = fetchNews.slice(startIndex, endIndex);

  const fetchData = useCallback(
    debounce(async () => {
      try {
        const fetch_news = await fetch_news_list();
        if (fetch_news) {
          setFetchNews(fetch_news);
          setTotalItems(fetch_news.length);
          setTotalPages(Math.ceil(totalItems / itemsPerPage));
          setStartIndex((currentPage - 1) * itemsPerPage);
          setEndIndex(startIndex + itemsPerPage);
        }
      } catch (error) {
        console.error(error);
        setTotalItems(0);
        setFetchNews([]);
      }
    }, 500),
    [fetch_news_list, setFetchNews]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (_event, page) => setCurrentPage(page);

  return (
    <Stack
      sx={{
        display: "flex",
        ...centeringStyles,
        minHeight: "70vh",
        maxHeight: "100vh",
        padding: 5,
      }}
    >
      {fetchNews.length > 0 && (
        <>
          <Grid container spacing={2} style={{ ...centeringStyles }}>
            {visibleNewss.map((element, index) => (
              <Grid item key={index}>
                <NewsCard anews={element} />
              </Grid>
            ))}
          </Grid>
          <Box
            mt={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Box>
        </>
      )}
    </Stack>
  );
};

export default NewsTable;
