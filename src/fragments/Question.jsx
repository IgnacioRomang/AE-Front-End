import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Question = ({ question, answer }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      sx={{
        border: `1px solid #999999`,
        "&:not(:last-child)": {
          borderBottom: 0,
        },
        "&::before": {
          display: "none",
        },
      }}
      expanded={expanded === question}
      onChange={handleChange(question)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ background: "rgba(0, 0, 0, .03)" }}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography variant="h6">{question}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          borderTop: "1px solid rgba(0, 0, 0, .125)",
          alignItems: "justify",
          justifyContent: "justify",
          textAlign: "justify",
        }}
      >
        {answer.map((line, index) => (
          <>
            <Typography>{line}</Typography>
          </>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default Question;
