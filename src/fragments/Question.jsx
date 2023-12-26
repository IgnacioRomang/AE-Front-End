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
      expanded={expanded === question}
      onChange={handleChange(question)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          alignItems: "justify",
          justifyContent: "justify",
          textAlign: "justify",
        }}
      >
        {answer.map((line, index) => (
          <>
            <Typography variant="body6">{line}</Typography>
            <br />
          </>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default Question;
