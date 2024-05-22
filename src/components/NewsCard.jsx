import { Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { Suspense } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { gridNewsCardStyle } from "../theme.jsx";

const NewsCard = React.memo(({ anews }) => {
  const navigate = useNavigate();

  const { id, image, title, abstract } = anews;

  const handleReadMoreClick = () => {
    navigate(`/document/${id}`);
  };

  return (
    <Card sx={gridNewsCardStyle}>
      <Suspense
        fallback={<Skeleton variant="rectangular" width={300} height={200} />}
      >
        <LazyLoadImage
          className="MuiCardMedia-img"
          src={`${process.env.REACT_APP_BACK_URL}${image}`}
          alt={title}
          title={title}
          loading="lazy"
          style={{
            scale: "1",
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Suspense>
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
