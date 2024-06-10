import {
  Box,
  Grid,
  Grow,
  Pagination,
  Skeleton,
  Stack,
  debounce,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, {
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { usePublicResources } from "../contexts/PublicResourcesContext";
import { centeringStyles } from "../theme.jsx";
import { isMobileDevice } from "../utiles.js";

const NewsCard = lazy(() => import("./NewsCard.jsx"));

/**
 * This function takes in an array of PDFs and returns a view of 3 PDFs in a row.
 * @param {PDF[]} news - An array of news objects, each representing a PDFs.
 * @returns {JSX.Element} A view of 3 PDFs in a row.
 */
const NewsTable = () => {
  const theme = useTheme();

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const itemsPerPage = isMobileDevice()
    ? 1
    : isMediumScreen
    ? isSmallScreen
      ? 1
      : 2
    : 3;

  const { fetch_news_list } = usePublicResources();
  const [fetchNews, setFetchNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage]
  );

  const endIndex = useMemo(
    () => startIndex + itemsPerPage,
    [startIndex, itemsPerPage]
  );

  const visibleNewss = useMemo(
    () => fetchNews.slice(startIndex, endIndex),
    [fetchNews, startIndex, endIndex]
  );
  const fetchDataCallback = useCallback(async () => {
    try {
      const fetch_news = await fetch_news_list();

      if (fetch_news) {
        localStorage.setItem(
          "fetch_news",
          JSON.stringify({
            news: fetch_news,
            timestamp: Date.now(),
          })
        );
        const totalItems = fetch_news.length;
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
        setFetchNews(fetch_news);
      }
    } catch (error) {
      console.error(error);
      setFetchNews([]);
    }
  }, [fetch_news_list, itemsPerPage]);

  const fetchData = useMemo(
    () => debounce(fetchDataCallback, 500),
    [fetchDataCallback]
  );

  useEffect(() => {
    let newsBack = JSON.parse(localStorage.getItem("fetch_news") || "null");
    if (newsBack && newsBack.timestamp >= Date.now() - 3600000) {
      setTotalPages(Math.ceil(newsBack.news.length / itemsPerPage));
      setFetchNews(newsBack.news);
    } else {
      fetchData();
    }
  }, [itemsPerPage, fetchData]);

  const handlePageChange = (_event, page) => setCurrentPage(page);
  //
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          ...centeringStyles,
          padding: 2,
        }}
      >
        {fetchNews.length > 0 ? (
          <>
            <Grid container spacing={2} sx={{ ...centeringStyles }}>
              {visibleNewss.map((element, index) => (
                <Grow in={true} key={index}>
                  <Grid item key={index}>
                    <NewsCard anews={element} />
                  </Grid>
                </Grow>
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
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Skeleton variant="rectangular" width={"50vw"} height={"50vh"} />
          </Box>
        )}
      </Stack>
    </>
  );
};

export default NewsTable;
