import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDatePlanAEString } from "../../contexts/TextProvider.jsx";
import { getDates } from "../../utiles.js";
import CheckIcon from "@mui/icons-material/Check";
function generarCodigo() {
  const caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let codigo = "";

  for (let i = 0; i < 6; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres.charAt(indiceAleatorio);
  }

  return codigo;
}

const DatePlanAE = ({ first }) => {
  const { startDay, fthMonth, sixMonth, lastMonth } = getDates();
  const labels = useDatePlanAEString();
  const [code, setCode] = React.useState(generarCodigo());
  const [codeEnter, setCodeEnter] = React.useState("");
  const [icon, setIcon] = React.useState(false);
  const [click, setClick] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(31);
  console.log(code);
  const handleCode = (value) => {
    setCodeEnter(value);
    if (value === code) {
      setIcon(true);
      setCode(null);
    }
  };
  return (
    <Box
      paddingBottom={3}
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4" color="primary" gutterBottom>
        {labels.title}
      </Typography>

      <Typography variant="h6">
        {labels.body[0]}
        {startDay.toLocaleDateString("en-GB")}.
      </Typography>
      {first && (
        <Typography variant="h6">
          {labels.body[1]}
          {fthMonth.toLocaleDateString("en-GB")}
          {labels.body[2]}
          {sixMonth.toLocaleDateString("en-GB")}.
        </Typography>
      )}
      <Typography variant="h6">
        {first ? labels.body[3] : labels.body[4]}
        {lastMonth.toLocaleDateString("en-GB")}.
      </Typography>
      <Typography variant="h6">{labels.body[5]}</Typography>

      <Typography variant="body1" paddingBottom={2}>
        Ingresa el codigo de verificacion enviado a tu email
      </Typography>
      <TextField
        label={labels.code}
        variant="outlined"
        onChange={(event) => handleCode(event.target.value)}
        disabled={icon}
        value={codeEnter}
        InputProps={{
          endAdornment: !icon ? (
            <>
              <RefreshIcon
                style={{ cursor: "pointer" }}
                disabled={click}
                color={!click ? "primary" : "#d6dbdf "}
                onClick={() => {
                  if (!click) {
                    setCode(generarCodigo());
                    setTimeLeft(30);
                    const intervalId = setInterval(() => {
                      setTimeLeft((prevTime) => prevTime - 1);
                    }, 1000);
                    setClick(true);
                    setTimeout(() => {
                      clearInterval(intervalId);
                      setIcon(false);
                      setClick(false);
                    }, 31000);
                  }
                }}
              />
              {click ? (
                <span style={{ marginLeft: "9px", color: "#d6dbdf " }}>
                  {timeLeft}s
                </span>
              ) : (
                <></>
              )}
            </>
          ) : (
            <CheckIcon />
          ),
        }}
      />
    </Box>
  );
};
export default DatePlanAE;
