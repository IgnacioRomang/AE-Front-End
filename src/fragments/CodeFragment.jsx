import CheckIcon from "@mui/icons-material/Check";
import RefreshIcon from "@mui/icons-material/Refresh";
import { TextField } from "@mui/material";
import React from "react";

const CodeFragment = ({ code, error, setCode, icon, setIcon, resend }) => {
  const [click, setClick] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(31);
  const handleCode = (value) => {
    if (value.length <= 6) {
      setCode(value.toUpperCase());
    }
  };
  return (
    <TextField
      label={"Code"}
      variant="outlined"
      onChange={(event) => handleCode(event.target.value)}
      disabled={icon}
      error={error}
      size="small"
      value={code}
      InputProps={{
        endAdornment: !icon ? (
          <>
            <RefreshIcon
              style={{ cursor: "pointer" }}
              disabled={click}
              color={!click ? "primary" : "#d6dbdf "}
              onClick={() => {
                if (!click) {
                  resend();
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
  );
};
export default CodeFragment;
