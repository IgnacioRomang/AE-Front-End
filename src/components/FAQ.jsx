import React from "react";
import Question from "../fragments/Question";
import { Paper, Typography } from "@mui/material";
import { Padding } from "@mui/icons-material";
import { useFAQString } from "../contexts/TextProvider";

const FAQ = (props) => {
  const labels = useFAQString();

  return (
    <Paper>
      <Typography variant="h5" padding={3}>
        {labels.title}
      </Typography>
      {labels.body.map((faq, index) => (
        <Question
          key={index}
          question={faq.question}
          answer={faq.answer}
          open={faq.isopen}
        />
      ))}
    </Paper>
  );
};

export default FAQ;
