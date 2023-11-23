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

const info_notice = {
    tags: ["Tag1", "Noticias", "InformacionUtil", "Mas", "Mas", "mas"],
    title: "Info Title",
    abstract:
        "Esto es un Abstract! , asd asd asd asd  as asd asd asd asd asd asd asd asd asd asd asd",
    imageUrl: "/images/ruleta-de-casino.png",
    imageTitle: "Img Title",
};
const theme = createTheme({
    spacing: 2,
});

const high_res = {
    display: {
        xs: "none",
        md: "none",
        lg: "flex",
    },
};
//TODO: agregar info_noticias y loading state a un props

const InfoCard = () => {
    const [loading, setLoading] = useState(false);

    return (
        <Card sx={{ maxWidth: 345 }}>
            {loading ? (
                <Skeleton
                    variant="rectangular"
                    height={140}
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
                    image={info_notice.imageUrl}
                    title={info_notice.imageTitle}
                />
            )}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {loading ? <Skeleton /> : info_notice.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {loading ? (
                        <Skeleton variant="rectangular" height={80} />
                    ) : (
                        info_notice.abstract
                    )}
                </Typography>
            </CardContent>
            <CardContent
                sx={{
                    display: high_res.display,
                    justifyContent: "center",
                    flexWrap: "wrap",
                    "& > *": {
                        margin: theme.spacing(0.5),
                    },
                }}
            >
                {loading ? (
                    <></>
                ) : (
                    info_notice.tags.map((tag, index) => (
                        <Chip key={index} label={tag} color="success" />
                    ))
                )}
            </CardContent>
            <Divider />
            <CardActions>
                <Button size="small" disabled={loading}>
                    Leer mas
                </Button>
            </CardActions>
        </Card>
    );
};

export default InfoCard;
