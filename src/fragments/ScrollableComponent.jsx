import React from "react";

const ScrollableComponent = ({ children, styles }) => {
  const newStyle = {
    minHeight: "90vh", // Esto dejalo asi no se por que pero fucniona de 10 xD
    padding: 25,
    ...styles,
  };
  if (window.innerWidth < 768) {
    newStyle.overflowY = "scroll"; // Aplicar desplazamiento vertical solo en pantallas pequeñas
  }
  return <div style={newStyle}>{children}</div>;
};

export default ScrollableComponent;
