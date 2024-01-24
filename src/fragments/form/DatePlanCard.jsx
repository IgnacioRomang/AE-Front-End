import CheckIcon from "@mui/icons-material/Check";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useDatePlanAEString } from "../../contexts/TextProvider.jsx";
import { getDates } from "../../utiles.js";

/* The code defines a React functional component called `DatePlanAE`. It is a form component that
displays information about dates and allows the user to enter a code. */
const DatePlanAE = React.forwardRef((props, ref) => {
  const { startDay, fthMonth, sixMonth, lastMonth } = getDates();
  const labels = useDatePlanAEString();
  const [codeverf, setCodeverf] = React.useState(true);
  const [codeEnter, setCodeEnter] = React.useState("");
  const [icon, setIcon] = React.useState(false);
  const [click, setClick] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(31);

  const handleSendMail = () => {
    let url = process.env.REACT_APP_BACK_URL;
    axios.post(url + "/api/auth/email/verify/send", {
      email: props.email,
    });
  };
  React.useEffect(() => {
    //handleSendMail();
  });
  const getData = () => {
    return {
      startDay: startDay,
      fthMonth: fthMonth,
      sixMonth: sixMonth,
      lastMonth: lastMonth,
    };
  };
  const handleErrors = React.useCallback(() => {
    return props.first ? !codeverf : false;
  }, [codeverf, props]);

  React.useImperativeHandle(ref, () => ({
    handleErrors,
    getData,
  }));

  const handleCode = (value) => {
    setCodeEnter(value);
    if (value.length === 6) {
      let url = process.env.REACT_APP_BACK_URL;
      axios
        .post(url + "/api/auth/email/verify", {
          code: value,
        })
        .then((response) => {
          if (response.data.msg && response.data.msg === "Código válido") {
            setIcon(true);
            setCodeverf(true);
          } else {
          }
        });
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
      {props.first && (
        <Typography variant="h6">
          {labels.body[1]}
          {fthMonth.toLocaleDateString("en-GB")}
          {labels.body[2]}
          {sixMonth.toLocaleDateString("en-GB")}.
        </Typography>
      )}
      <Typography variant="h6">
        {props.first ? labels.body[3] : labels.body[4]}
        {lastMonth.toLocaleDateString("en-GB")}.
      </Typography>
      <Typography paddingBottom={3} variant="h6">
        {labels.body[5]}
      </Typography>
      {false && (
        <>
          <Typography variant="body1" paddingBottom={2}>
            {labels.msgCode}
          </Typography>
          <TextField
            label={labels.code}
            size="small"
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
                        handleSendMail();
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
        </>
      )}
    </Box>
  );
});
export default DatePlanAE;
