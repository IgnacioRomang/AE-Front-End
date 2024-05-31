import { Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePublicResources } from "../contexts/PublicResourcesContext";

import {
  ProgressBar,
  ScrollMode,
  SpecialZoomLevel,
  ViewMode,
  Viewer,
  Worker,
} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { base64toBlob } from "../utiles";

import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

/**
 * This function is a React component that displays a PDF document.
 * @param {object} props - The properties of the component.
 */
const NewsView = () => {
  const [pdf, setPdf] = useState([]);
  const [url, setUrl] = useState("");
  const { id } = useParams();
  const { fetch_news_pdf } = usePublicResources();
  const fetchData = useCallback(async () => {
    try {
      const news_pdf = await fetch_news_pdf(id);
      if (news_pdf) {
        setPdf(news_pdf);
        setUrl(URL.createObjectURL(base64toBlob(news_pdf.pdf)));
        //console.log(news_pdf);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, fetch_news_pdf, setPdf]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //

  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  return (
    <Paper
      sx={{
        width: "98vw",
        //height: "100vh",
        display: "flex",
        flexDirection: "column",
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
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "750px",
              }}
            >
              <Worker
                workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"
                renderLoader={(percentages) => (
                  <div style={{ width: "240px" }}>
                    <ProgressBar progress={Math.round(percentages)} />
                  </div>
                )}
              >
                <div
                  className="rpv-core__viewer"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    display: "flex",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      alignItems: "center",
                      backgroundColor: "#eeeeee",
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                      borderRadius: "2px",
                      top: "16px",
                      display: "flex",
                      left: "50%",
                      padding: "4px",
                      position: "absolute",
                      transform: "translate(-50%, 0)",
                      zIndex: 1,
                    }}
                  >
                    <Toolbar>
                      {(props) => {
                        const {
                          CurrentPageInput,
                          Download,
                          EnterFullScreen,
                          GoToNextPage,
                          GoToPreviousPage,
                          NumberOfPages,
                          Print,
                          ZoomIn,
                          ZoomOut,
                        } = props;
                        return (
                          <>
                            <div style={{ padding: "0px 2px" }}>
                              <ZoomOut />
                            </div>
                            <div style={{ padding: "0px 2px" }}>
                              <ZoomIn />
                            </div>
                            <div
                              style={{ padding: "0px 2px", marginLeft: "auto" }}
                            >
                              <GoToPreviousPage />
                            </div>
                            <div style={{ padding: "0px 2px", width: "4rem" }}>
                              <CurrentPageInput />
                            </div>
                            <div style={{ padding: "0px 2px" }}>
                              / <NumberOfPages />
                            </div>
                            <div style={{ padding: "0px 2px" }}>
                              <GoToNextPage />
                            </div>
                            <div
                              style={{ padding: "0px 2px", marginLeft: "auto" }}
                            >
                              <EnterFullScreen />
                            </div>
                            <div style={{ padding: "0px 2px" }}>
                              <Download />
                            </div>
                            <div style={{ padding: "0px 2px" }}>
                              <Print />
                            </div>
                          </>
                        );
                      }}
                    </Toolbar>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      overflow: "hidden",
                    }}
                  >
                    <Viewer
                      theme="dark"
                      scrollMode={ScrollMode.Vertical}
                      viewMode={ViewMode.SinglePage}
                      defaultScale={SpecialZoomLevel.PageFit}
                      fileUrl={url}
                      plugins={[toolbarPluginInstance]}
                    />
                  </div>
                </div>
              </Worker>
            </div>
          ) : (
            <></>
          )}

          {/**          
           * URL.createObjectURL(base64toBlob(pdf.pdf))
           * <embed
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
