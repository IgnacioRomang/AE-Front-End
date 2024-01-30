import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useService } from "../contexts/ServiceContext";
import { useEmailVerifyString } from "../contexts/TextProvider";

/**
 * The `VerificationCard` component is a React component that displays a card with a loading spinner
 * and a verification result message.
 *
 * @param {string} id - The unique identifier of the email verification request.
 * @param {string} hash - The cryptographic hash of the email verification request.
 * @returns {JSX.Element} The `VerificationCard` component.
 */
const VerificationCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const labels = useEmailVerifyString();
  const navigate = useNavigate();
  const { id, hash } = useParams();
  const {send_confirmation_verify} = useService();
  /**
   * The function `verifyEmail` is an asynchronous function that sends a POST request to verify an email
   * using the provided `id` and `hash`, and updates the verification result accordingly.
   *
   * @async
   */
  const verifyEmail = React.useCallback(async () => {
    //TODO Work in progress
    try {
      let result = send_confirmation_verify(id,hash);
      setSuccess(result)
    } catch (error) {
      console.error("Error al verificar el email", error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/");
    }
  }, [id, hash, setLoading]);

  React.useEffect(() => {
    verifyEmail();
  }, [navigate, verifyEmail]);

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
              {success ? (
                <CheckCircleOutlineIcon sx={{ fontSize: 40, color: "green" }} />
              ) : (
                <HighlightOffIcon sx={{ fontSize: 40, color: "red" }} />
              )}

              <Typography paddingTop={3} variant="body1">
                {success ? labels.success : labels.error}
              </Typography>
            </Stack>
          )}
        </>
      </CardContent>
    </Card>
  );
};

export default VerificationCard;
