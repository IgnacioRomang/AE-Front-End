import React, { useState, cloneElement } from "react";

const SixtysecFragment = (props) => {
  const [click, setClick] = useState(false);
  const [timeLeft, setTimeLeft] = useState(31);
  const handleClick = async (event) => {
    if (!click) {
      const result = await props.action();
      if (!result) {
        return;
      }
      setTimeLeft(30);
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setClick(true);
      setTimeout(() => {
        clearInterval(intervalId);
        setClick(false);
      }, 31000);
    }
  };

  const handleLabel = () => {
    return (
      <>
        {props.label}
        {click ? (
          <span style={{ marginLeft: "9px", color: "#d6dbdf " }}>
            {timeLeft}s
          </span>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <>
      {cloneElement(
        props.children,
        {
          onClick: handleClick,
          disabled: click,
          size: "small",
          style: click
            ? {
                marginLeft: "9px",
                color: "#d6dbdf ",
                textDecorationColor: "#d6dbdf ",
              }
            : null,
        },
        handleLabel()
      )}
    </>
  );
};

export default SixtysecFragment;
