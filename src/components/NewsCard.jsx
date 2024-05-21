import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import { gridNewsCardStyle } from "../theme.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NewsCard = React.memo(({ anews }) => {
  const navigate = useNavigate();

  const { id, image, thubpmbnail, title, abstract } = anews;

  const handleReadMoreClick = () => {
    navigate(`/document/${id}`);
  };

  return (
    <Card sx={gridNewsCardStyle}>
      <LazyLoadImage
        className="MuiCardMedia-img"
        src={`${process.env.REACT_APP_BACK_URL}${image}`}
        alt={title}
        title={title}
        style={{
          height: "75%",
          width: "100%",
          objectFit: "cover",
        }}
        placeholder={<div className="placeholder" />}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {abstract}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleReadMoreClick}>
          Leer más
        </Button>
      </CardActions>
    </Card>
  );
});

export default NewsCard;
