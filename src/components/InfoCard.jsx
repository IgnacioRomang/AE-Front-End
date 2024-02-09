import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

const InfoCard = ({ pdf }) => {
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
    navigate(`/document/${pdf.id}`);
  };

  return (
    <Card sx={{ maxWidth: 365, maxHeight: 465, margin: "auto" }}>
      <CardMedia
        component="img"
        ref={cardMediaRef}
        src={
          isVisible
            ? process.env.REACT_APP_BACK_URL + pdf.img
            : process.env.REACT_APP_BACK_URL + pdf.thumbnail
        }
        alt={pdf.title}
        title={pdf.title}
        loading="lazy"
        sx={{ height: 140 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pdf.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pdf.abstract}
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
