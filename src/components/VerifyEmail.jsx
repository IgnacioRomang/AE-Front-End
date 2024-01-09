import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

// Componente funcional Card
const VerificationCard = ({ id, hash }) => {
  const [loading, setLoading] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null);
  const navigate = useNavigate();

  // Función para verificar el email
  const verifyEmail = async () => {
    try {
      const response = await axios.post(`/email/verify/${id}/${hash}`);

      if (response.data.success) {
        setVerificationResult("Email verificado exitosamente");
      } else {
        // Puedes manejar el caso de error si es necesario
      }
    } catch (error) {
      console.error("Error al verificar el email", error);
      // Puedes manejar el error y redirigir a una página de error si es necesario
      // navigate("/error");
    } finally {
      // Espera 5 segundos antes de desactivar la carga
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setLoading(false);

      // Puedes redirigir a otra página si es necesario
      // navigate("/");
    }
  };

  // Realiza la verificación cuando el componente se monta
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
