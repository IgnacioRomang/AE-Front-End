import React, { Suspense } from "react";
import { CardMedia, Skeleton } from "@mui/material";
import LazyImage from "./LazyImage";

function LazyLoadedCardMedia({ pdf, highResDisplay }) {
  return (
    <Suspense
      fallback={<Skeleton variant="rectangular" height={140} width="100%" />}
    >
      {pdf && pdf.title ? ( // Verifica si pdf y pdf.title existen antes de renderizar CardMedia
        <CardMedia
          sx={{
            display: highResDisplay.display,
            height: 140,
            width: "100%",
          }}
          title={pdf.title}
        >
          <LazyImage base64Image={pdf.img} />
        </CardMedia>
      ) : (
        <Skeleton variant="rectangular" height={140} width="100%" />
      )}
    </Suspense>
  );
}

export default LazyLoadedCardMedia;
