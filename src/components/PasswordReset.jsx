import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext";
import { useComponentPasswordResetString } from "../contexts/TextProvider";
import AlertFragment from "../fragments/AlertFragmet";

const PasswordReset = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const passwordresetlabels = useComponentPasswordResetString();
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
              <Typography variant="body1">
                {passwordresetlabels.loading}
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
              {success ? (
                <AlertFragment
                  type="success"
                  title={passwordresetlabels.title}
                  body={passwordresetlabels.success.body}
                  strong={passwordresetlabels.success.strong}
                />
              ) : (
                <AlertFragment
                  type="error"
                  title={passwordresetlabels.title}
                  body={passwordresetlabels.fail.body}
                  strong={passwordresetlabels.v.strong}
                />
              )}
            </Stack>
          )}
        </>
      </CardContent>
    </Card>
  );
};

export default PasswordReset;
