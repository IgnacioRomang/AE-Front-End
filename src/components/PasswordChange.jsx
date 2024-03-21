import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext";
import {
  useCommonsButtonString,
  useComponentPasswordAlertString,
  useComponentPasswordChangeString,
} from "../contexts/TextProvider";
import PasswordFragment from "../fragments/PasswordFragment";
import { boxLoginSyle, cardLoginStyle, centerButtonsStyle } from "../theme";
import { usePasswordService } from "../contexts/PasswordContext";
import ProcessAlert from "../fragments/ProcessAlert";

/**
 * The `ResetPassword` function is a React component that handles the process of resetting a user's
 * password.
 * @returns The `ResetPassword` component is returning a JSX element, specifically a `Card` component
 * with various child components such as `CardHeader`, `CardContent`, `Collapse`, `Alert`, and
 * `CardActions`.
 */
const PasswordChange = () => {
  const commonbutton = useCommonsButtonString();
  const passwordchange = useComponentPasswordChangeString();
  const passwordalert = useComponentPasswordAlertString();
  const nav = useNavigate();
  const { User, setUser, setIsAuthenticated } = useService();
  const ref = useRef(null);
  const [error, setError] = useState(false);
  const { change_user_password } = usePasswordService();

  useEffect(() => {
    if (User === null) {
      nav("/");
    }
  }, [nav, User]);

  const handleAcept = async (input) => {
    const { error, data } = ref.current.sendData(input);
    setError(error);
    if (!error) {
      try {
        console.log(data);
        const response = await change_user_password(data);
        setError(!response);
        setOpen(true);
        setLoading(false);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (response) {
          setUser(null);
          setIsAuthenticated(false);
          nav("/auth/login", { replace: true });
        } else {
          setError(true);
          nav("/ae/profile");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setError(true);
      }
    }
  };
  const handleBack = () => {
    nav(-1);
  };

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  return (
    <>
      {!open && (
        <Card sx={cardLoginStyle}>
          <CardHeader title={passwordchange.title} />
          <CardContent container sx={boxLoginSyle}>
            <CardContent item sx={12} sm={8}>
              <PasswordFragment ref={ref} />
            </CardContent>
            <CardContent item sx={12} sm={8}>
              <Collapse in={error}>
                <Alert
                  severity="error"
                  style={{ textAlign: "left", marginTop: "16px" }}
                >
                  <AlertTitle>
                    {passwordalert.info.requirements.title}
                  </AlertTitle>
                  <ul>
                    {passwordalert.info.requirements.body.map(
                      (lablel, index) => (
                        <li key={index}>{lablel}</li>
                      )
                    )}
                  </ul>
                </Alert>
              </Collapse>
            </CardContent>
          </CardContent>
          <CardActions sx={centerButtonsStyle}>
            <Button size="small" onClick={handleBack} color="inherit">
              {commonbutton.back}
            </Button>
            <Button size="small" onClick={handleAcept}>
              {commonbutton.ok}
            </Button>
          </CardActions>
        </Card>
      )}

      <ProcessAlert open={open} loading={loading} success={!error} />
    </>
  );
};

export default PasswordChange;
