import React from "react";

const ScrollableComponent = ({ children, styles }) => {
    const newStyle = {
        minHeight: "100vh",
        overflowY: "scroll",
        ...styles,
    };
    return <div style={newStyle}>{children}</div>;
};

export default ScrollableComponent;
