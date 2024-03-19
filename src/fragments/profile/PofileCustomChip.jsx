import React from "react";

const CustomChip = ({ text, color }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        padding: "5px",
        borderRadius: "5px",
        margin: "5px",
        display: "inline-block",
      }}
    >
      <span style={{ fontSize: "12px" }}>{text}</span>
    </div>
  );
};

export default CustomChip;
