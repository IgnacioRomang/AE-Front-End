import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* The `VerificationCard` component is a React component that displays a card with a loading spinner
and a verification result message. */
const VerificationCard = ({ id, hash }) => {
  const [loading, setLoading] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null);
  const navigate = useNavigate();

  /**
   * The function `verifyEmail` is an asynchronous function that sends a POST request to verify an email
   * using the provided `id` and `hash`, and updates the verification result accordingly.
   */
  const verifyEmail = async () => {
    //TODO Work in progress
    try {
      const response = await axios.post(`/email/verify/${id}/${hash}`);

      if (response.data.success) {
        setVerificationResult("Email verificado exitosamente");
      } else {
      }
    } catch (error) {
      console.error("Error al verificar el email", error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <Card>
      <CardContent sx={{ padding: 4 }}>
        <>
          {loading ? (
            <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress />
              <Typography variant="body1">{"Verificando email..."}</Typography>
            </Stack>
          ) : (
            <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 40, color: "green" }} />
              <Typography paddingTop={3} variant="body1">
                {verificationResult}
              </Typography>
            </Stack>
          )}
        </>
      </CardContent>
    </Card>
  );
};

export default VerificationCard;
