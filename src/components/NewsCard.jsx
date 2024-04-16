import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import { gridNewsCardStyle } from "../theme";

const NewsCard = ({ anews }) => {
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate(`/document/${anews.id}`);
  };

  return (
    <Card sx={gridNewsCardStyle}>
      <CardMedia
        className=".MuiCardMedia-img"
        component="img"
        src={`${process.env.REACT_APP_BACK_URL}${anews.image}`}
        alt={anews.title}
        thubpmbnail={anews.thubpmbnail}
        title={anews.title}
        loading="lazy"
        sx={{ height: "20vh", objectFit: "fill" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {anews.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {anews.abstract}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleReadMoreClick}>
          Leer más
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
