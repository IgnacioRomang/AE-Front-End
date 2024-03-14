import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useService } from "../contexts/ServiceContext";
import { useEmailVerifyString } from "../contexts/TextProvider";

const PasswordReset = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const labels = useEmailVerifyString();
  const navigate = useNavigate();

  const token = new URLSearchParams(window.location.search).get("token");

  const { send_reset_password } = useService();

  const { cuil, setCuil } = useState();
  const { password, setPassword } = useState();

  const sendData = async () => {
    try {
      const result = await send_reset_password(token, cuil, password);
      setSuccess(result);
      setLoading(result);
    } catch (error) {
      setSuccess(false);
      setLoading(false);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    sendData();
  }, []);

  return (
    <Card>
      <CardContent sx={{ padding: 4 }}></CardContent>
      <CardContent sx={{ padding: 4 }}>
        <>
          {loading ? (
            <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress />
              <Typography variant="body1">{"Enviando datos..."}</Typography>
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

export default PasswordReset;
