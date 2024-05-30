import { Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePublicResources } from "../contexts/PublicResourcesContext";

import {
  ProgressBar,
  ScrollMode,
  ViewMode,
  Viewer,
  Worker,
} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { base64toBlob } from "../utiles";

/**
 * This function is a React component that displays a PDF document.
 * @param {object} props - The properties of the component.
 */
const NewsView = () => {
  const [pdf, setPdf] = useState([]);
  const { id } = useParams();
  const { fetch_news_pdf } = usePublicResources();
  const fetchData = useCallback(async () => {
    try {
      const news_pdf = await fetch_news_pdf(id);
      if (news_pdf) {
        setPdf(news_pdf);
        //console.log(news_pdf);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, fetch_news_pdf, setPdf]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Paper
      sx={{
        width: "98vw",
        //height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#D5DBDB",
      }}
    >
      <Grid container direction="column" style={{ flex: 1 }} spacing={2}>
        <Grid item>
          <Typography paddingTop={2} paddingBottom={2} variant="h5">
            {pdf.title}
          </Typography>
          <Divider />
        </Grid>
        <Grid item style={{ flex: 1 }}>
          {pdf.pdf ? (
            <Worker
              workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"
              renderLoader={(percentages) => (
                <div style={{ width: "240px" }}>
                  <ProgressBar progress={Math.round(percentages)} />
                </div>
              )}
            >
              <Viewer
                scrollMode={ScrollMode.Vertical}
                viewMode={ViewMode.SinglePage}
                //plugins={[defaultLayoutPluginInstance]}
                httpHeaders={{
                  "Access-Control-Allow-Origin": "*",
                }}
                fileUrl={URL.createObjectURL(base64toBlob(pdf.pdf))}
              />
            </Worker>
          ) : (
            <></>
          )}

          {/**          <embed
            title="PDF Viewer"
            src={`${process.env.REACT_APP_BACK_URL}${pdf.pdf}`}
            width="100%"
            height="100%"
            style={{ border: "none" }}
          /> */}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NewsView;
