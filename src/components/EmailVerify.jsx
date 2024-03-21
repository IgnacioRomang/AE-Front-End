import { Backdrop, Paper, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useService } from "../contexts/ServiceContext";
import {
  useCommonsTextString,
  useComponentEmailVerifyString,
} from "../contexts/TextProvider";
import AlertFragment from "../fragments/AlertFragmet";
import { useEmailVerify } from "../contexts/EmailVerifyContext";

/**
 * The `VerificationCard` component is a React component that displays a card with a loading spinner
 * and a verification result message.
 *
 * @param {string} id - The unique identifier of the email verification request.
 * @param {string} hash - The cryptographic hash of the email verification request.
 * @returns {JSX.Element} The `VerificationCard` component.
 */
const EmailVerify = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const emailverifylabels = useComponentEmailVerifyString();

  const navigate = useNavigate();

  const { id, hash } = useParams();
  const expires = new URLSearchParams(window.location.search).get("expires");
  const signature = new URLSearchParams(window.location.search).get(
    "signature"
  );

  const { isAuthenticated } = useService();
  const { send_confirmation_verify } = useEmailVerify();
  /**
   * The function `verifyEmail` is an asynchronous function that sends a POST request to verify an email
   * using the provided `id` and `hash`, and updates the verification result accordingly.
   *
   * @async
   */
  const verifyEmail = async () => {
    try {
      const result = await send_confirmation_verify(
        id,
        hash,
        expires,
        signature
      );
      setSuccess(result);
      setLoading(result);
    } catch (error) {
      setSuccess(false);
      setLoading(false);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      verifyEmail();
    }
  }, [isAuthenticated]);

  return (
    <Backdrop open={true}>
      {loading ? (
        <Paper>
          <Stack
            padding={4}
            spacing={5}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CircularProgress />
            <Typography variant="body1">{emailverifylabels.loading}</Typography>
          </Stack>
        </Paper>
      ) : success && !loading ? (
        <AlertFragment
          type={"success"}
          title={emailverifylabels.title}
          body={emailverifylabels.alert.success.body}
          strong={emailverifylabels.alert.success.strong}
        />
      ) : (
        <AlertFragment
          type={"error"}
          title={emailverifylabels.title}
          body={emailverifylabels.alert.fail.body}
          strong={emailverifylabels.alert.fail.strong}
        />
      )}
    </Backdrop>
  );
};

export default EmailVerify;
