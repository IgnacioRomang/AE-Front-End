import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
    Alert,
    AlertTitle,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    Divider,
    Link,
    Stack,
    TextField,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import { useCommonsString, useLoginString } from "../contexts/TextProvider.jsx";
import {
    backdropLoginStyle,
    cardLoginStyle,
    centerBottonsStyle,
    linksStyle
} from "../theme.jsx";

const Login = () => {
    const [open, setOpen] = React.useState(false);
    const [labels, assets] = useLoginString();
    const commonlabels = useCommonsString();

    //Si es verdadero desactiva los botones y muestra el mensaje de exito
    //para poder enviarlo  a la proxima pantalla
    const [loginSuccess, setLoginSuccess] = React.useState(false);

    //Si es verdadero muestra el mensaje de fallo en logeo
    const [loginFail, setLoginFail] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        let proces = true;
        if (proces === true) {
            setLoginSuccess(true);
            // hacer
        } else {
            setLoginFail(true);
            //Activar mensajes de error en los text
        }
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleLogin = (event) => {
        //TODO LOGIN
        handleOpen();
    };
    const handleCuil = (event) => {
        // Si esta en error cambiar eso
        //TODO hacer que solo acepte numeros y - por si algun bruto lo pone asi
    };
    const handlePassword = (event) => {
        // Si esta en error cambiar eso
        //TODO
    };
    return (
        <Card sx={cardLoginStyle}>
            <Backdrop sx={backdropLoginStyle} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {/*Titulo del cards*/}
            <CardHeader
                titleTypographyProps={{ variant: "h6" }}
                avatar={<LockOpenIcon />}
                title={labels.title}
            />
            <CardContent>
                <Stack spacing={2}>
                    <TextField
                        id="cuil"
                        label={labels.textFieldLabels.user}
                        required
                        disabled={loginSuccess}
                        error={loginFail}
                        onChange={handleCuil}
                        variant="standard"
                    />
                    <TextField
                        id="password"
                        label={labels.textFieldLabels.password}
                        type="password"
                        required
                        onChange={handlePassword}
                        error={loginFail}
                        disabled={loginSuccess}
                        variant="standard"
                    />

                    {/* links */}
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent={"center"}
                        spacing={1}
                    >
                        <Link
                            component="button"
                            href={assets.links.password}
                            disabled={loginSuccess}
                            underline="hover"
                            style={loginSuccess ? linksStyle : null}
                        >
                            {labels.links.labels.password}
                        </Link>
                        <Link
                            component="button"
                            href={assets.links.account}
                            disabled={loginSuccess}
                            underline="hover"
                            style={loginSuccess ? linksStyle : null}
                        >
                            {labels.links.labels.account}
                        </Link>
                    </Stack>
                    <Divider></Divider>
                    {/* BOTONES */}
                    <CardActions sx={centerBottonsStyle}>
                        <Button
                            size="small"
                            color="inherit"
                            disabled={loginSuccess}
                        >
                            {commonlabels.button.cancel}
                        </Button>
                        <Button
                            size="small"
                            onClick={handleLogin}
                            disabled={loginSuccess}
                        >
                            {commonlabels.button.ok}
                        </Button>
                    </CardActions>
                </Stack>
            </CardContent>
            {/* Notificvacion de exito */}
            <Collapse in={loginSuccess}>
                <Alert severity="success">
                    <AlertTitle>{labels.alerts.success.title}</AlertTitle>
                    {labels.alerts.success.body}
                    <strong>{labels.alerts.success.strong}</strong>
                </Alert>
            </Collapse>
            {/* Notificacion de error */}
            <Collapse in={loginFail}>
                <Alert severity="error">
                    <AlertTitle>{labels.alerts.fail.title}</AlertTitle>
                    {labels.alerts.fail.body}
                    <strong>{labels.alerts.fail.strong}</strong>
                </Alert>
            </Collapse>
        </Card>
    );
};

export default Login;
