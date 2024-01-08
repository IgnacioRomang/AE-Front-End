import { Chip, Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { infoCArdStyle } from "../theme";

const theme = createTheme({
  spacing: 2,
});

const high_res = {
  display: {
    xs: "none",
    md: "flex",
    lg: "flex",
  },
};

//TODO: agregar info_noticias y loading state a un props

const InfoCard = ({ state, pdf }) => {
  const [loading, setLoading] = useState(state);
  const navigate = useNavigate();
  return (
    <Card sx={infoCArdStyle}>
      {loading ? (
        <Skeleton
          variant="rectangular"
          height={"25vh"}
          width={"30vw"}
          sx={{
            display: high_res.display,
          }}
        />
      ) : (
        <CardMedia
          sx={{
            display: high_res.display,
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
            <Skeleton variant="rectangular" height={80} />
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
};

export default InfoCard;
