import { Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { infoCArdStyle } from "../theme";

/**
 * A high-resolution display configuration object.
 * @typedef {Object} HighResDisplayConfig
 * @property {string} display.xs - The display style for extra-small screens.
 * @property {string} display.md - The display style for medium screens.
 * @property {string} display.lg - The display style for large screens.
 */

/**
 * A card style object for the info card component.
 * @typedef {Object} InfoCardStyle
 * @property {import("@mui/system").CSSObject} card - The CSS styles for the card component.
 */

/**
 * Props for the InfoCard component.
 * @typedef {Object} InfoCardProps
 * @property {boolean} state - Indicates whether the card is in a loading state.
 * @property {Object} pdf - The PDF document data.
 */

/**
 * A component that displays an info card for a PDF document.
 * @param {InfoCardProps} props - The props for the InfoCard component.
 * @returns {JSX.Element} A React element that displays an info card for a PDF document.
 */
function InfoCard(props) {
  const { state, pdf } = props;
  const [loading, setLoading] = useState(state);
  const navigate = useNavigate();

  /**
   * A high-resolution display configuration object.
   * @type {HighResDisplayConfig}
   */
  const highResDisplay = {
    display: {
      xs: "none",
      md: "flex",
      lg: "flex",
    },
  };

  /**
   * A card style object for the info card component.
   * @type {InfoCardStyle}
   */
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
          }}
          image={`data:image/png;base64,${pdf.img}`}
          title={pdf.title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {loading ? <Skeleton /> : pdf.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {loading ? (
            <Skeleton variant="rectangular" height={80} width={"30vw"} />
          ) : (
            pdf.abstract
          )}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          disabled={loading}
          onClick={() => {
            navigate("/document/" + pdf.id);
          }}
        >
          Leer mas
        </Button>
      </CardActions>
    </Card>
  );
}

export default InfoCard;
