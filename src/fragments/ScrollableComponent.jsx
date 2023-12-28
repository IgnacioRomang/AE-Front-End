import React from "react";

const ScrollableComponent = ({ children, styles }) => {
  const newStyle = {
    minHeight: "vh", // Esto dejalo asi no se por que pero fucniona de 10 xD
    overflowY: "scroll",
    ...styles,
  };
  return <div style={newStyle}>{children}</div>;
};

export default ScrollableComponent;
