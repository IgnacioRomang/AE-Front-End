import { Alert, Box, Typography } from "@mui/material";
import React from "react";
import { useErrorAEString } from "../contexts/TextProvider.jsx";
import { getDates } from "../utiles.js";

const ErrorAE = () => {
    const { startDay, fthMonth, sixMonth, lastMonth } = getDates();
    const labels = useErrorAEString();
    return (
        <Box
            paddingbottom={5}
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Typography variant="h4" color="error" gutterBottom>
                {labels.title}
            </Typography>
            <Typography variant="h6" style={{ color: "red" }}>
                {labels.body}
            </Typography>
            <Alert paddingbottom={5} severity="error">
                <Typography>{labels.alert.body[0]}</Typography>
                <Typography>{labels.alert.body[1]}</Typography>
            </Alert>
        </Box>
    );
};
export default ErrorAE;
