import React, { useState, Suspense } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import LazyLoadedCardMedia from "../fragments/LazyLoadedCardMedia";

const Typography = React.lazy(() => import("@mui/material/Typography"));
const Skeleton = React.lazy(() => import("@mui/material/Skeleton"));
/**
 * A component that displays an info card for a PDF document.
 * @param {InfoCardProps} props - The props for the InfoCard component.
 * @returns {JSX.Element} A React element that displays an info card for a PDF document.
 */
function InfoCard(props) {
  const { state, pdf } = props;

  const [loading, setLoading] = useState(state);
  const navigate = useNavigate();
  const highResDisplay = {
    display: {
      xs: "none",
      md: "flex",
      lg: "flex",
    },
  };
  const infoCardStyle = {
    card: {
      maxWidth: 345,
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: 3,
      "&:hover": {
        boxShadow: 6,
      },
    },
  };

  return (
    <React.Suspense
      fallback={
        <Skeleton
          variant="rectangular"
          height={"25vh"}
          width={"30vw"}
          sx={{ display: highResDisplay.display }}
        />
      }
    >
      <Card sx={infoCardStyle.card}>
        {loading ? (
          <Skeleton
            variant="rectangular"
            height={"25vh"}
            width={"30vw"}
            sx={{
              display: highResDisplay.display,
            }}
          />
        ) : (
          <CardMedia
            sx={{
              display: highResDisplay.display,
              height: 140,
              width: "100%",
            }}
            image={`data:image/png;base64,${pdf.img}`}
            title={pdf.title}
          />
        )}

        <CardContent>
          <Suspense fallback={<Skeleton variant="text" />}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {loading ? (
                  <Skeleton variant="rectangular" height={80} width={"30vw"} />
                ) : (
                  pdf.abstract
                )}
              </Typography>
            </CardContent>
          </Suspense>
        </CardContent>

        <CardActions
          sx={{ textAlign: "left", display: "flex", alignItems: "flex-start" }}
        >
          <Button
            size="small"
            disabled={loading}
            onClick={() => {
              navigate("/document/" + pdf.id.toString());
            }}
          >
            Leer mas
          </Button>
        </CardActions>
      </Card>
    </React.Suspense>
  );
}

export default InfoCard;
