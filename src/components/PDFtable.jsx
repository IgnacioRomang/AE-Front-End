import React from "react";
import { Grid } from "@mui/material";
import InfoCard from "./InfoCard";
const PdfTable = ({ pdfs }) => {
  const rows = [];
  for (let i = 0; i < pdfs.length; i += 3) {
    rows.push(pdfs.slice(i, i + 3));
  }

  return (
    <Grid container spacing={3}>
      {rows.map((row, rowIndex) => (
        <Grid
          container
          item
          key={rowIndex}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          {row.map((pdf, columnIndex) => (
            <Grid item xs={4} key={columnIndex}>
              <InfoCard pdf={pdf} />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default PdfTable;
