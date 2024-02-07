import React from "react";

function LazyImage({ base64Image }) {
  return <img src={`data:image/png;base64,${base64Image}`} loading="lazy" />;
}

export default LazyImage;
