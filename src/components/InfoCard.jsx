import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const InfoCard = ({ news }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const cardMediaRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardMediaRef.current) {
      observer.observe(cardMediaRef.current);
    }

    return () => {
      if (cardMediaRef.current) {
        observer.unobserve(cardMediaRef.current);
      }
    };
  }, []);

  const handleReadMoreClick = () => {
    navigate(`/document/${news.id}`);
  };

  return (
    <Card sx={{ maxWidth: 365, maxHeight: 465, margin: "auto" }}>
      <CardMedia
        component="img"
        ref={cardMediaRef}
        src={
          isVisible
            ? process.env.REACT_APP_BACK_URL + news.image
            : process.env.REACT_APP_BACK_URL +
              news.img +
              "?tr=w-400,h-300,bl-30,q-50"
        }
        alt={news.title}
        title={news.title}
        loading="lazy"
        sx={{ height: "20vh", maxWidth: 365 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {news.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {news.abstract}
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

export default InfoCard;
