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
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext";
import {
  useCommonsString,
  useResetPasswordCardString,
} from "../contexts/TextProvider";
import PasswordFragment from "../fragments/PasswordFragment";
import { boxLoginSyle, cardLoginStyle, centerButtonsStyle } from "../theme";

/**
 * The `ResetPassword` function is a React component that handles the process of resetting a user's
 * password.
 * @returns The `ResetPassword` component is returning a JSX element, specifically a `Card` component
 * with various child components such as `CardHeader`, `CardContent`, `Collapse`, `Alert`, and
 * `CardActions`.
 */
const ResetPassword = () => {
  const labelbutton = useCommonsString();
  const label = useResetPasswordCardString();
  const nav = useNavigate();
  const { User, setUser, setIsAuthenticated } = useService();
  const ref = React.useRef(null);
  const [error, setError] = React.useState(false);
  const { change_user_password } = useService();
  /**
   * Sends a POST request to the server to change the user's password and handles the response.
   * @param {object} data - The data to be sent in the POST request.
   * @param {string} data.old_password - The user's old password.
   * @param {string} data.new_password1 - The user's new password.
   * @param {string} data.new_password2 - The user's new password (again) to confirm.
   * @returns {Array} - An array containing a boolean indicating whether there was an error and an
   * object containing the response data.
   */

  React.useEffect(() => {
    if (User === null) {
      nav("/");
    }
  }, [nav, User]);
  const handleAcept = (input) => {
    const { error, data } = ref.current.sendData(input);
    setError(error);
    if (!error) {
      try {
        console.log(data);
        const response = change_user_password(data);
        setError(!response);
        if (response) {
          setUser(null);
          setIsAuthenticated(false);
          nav("/auth/login", { replace: true });
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        console.error("Detalles del error:", error.response.data);
        setError(true);
      }
      /*
      let url = process.env.REACT_APP_BACK_URL;
      axios
        .post(url + "/api/auth/change-password", result[1])
        .then((response) => {
          console.log(response.data);
          setError(false);
          setUser(null);
          setIsAuthenticated(false);
          nav("/auth/login", { replace: true });
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
          console.error("Detalles del error:", error.response.data);
          setError(true);
        });
        */
    }
  };
  const handleBack = () => {
    nav("/user/profile");
  };
  return (
    <Card sx={cardLoginStyle}>
      <CardHeader title={label.title} />
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
              <AlertTitle>{label.alert.title}</AlertTitle>
              <ul>
                {label.alert.body.map((lablel, index) => (
                  <li key={index}>{lablel}</li>
                ))}
              </ul>
            </Alert>
          </Collapse>
        </CardContent>
      </CardContent>
      <CardActions sx={centerButtonsStyle}>
        <Button size="small" onClick={handleBack} color="inherit">
          {labelbutton.button.back}
        </Button>
        <Button size="small" onClick={handleAcept}>
          {labelbutton.button.ok}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ResetPassword;
