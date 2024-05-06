import { List, ListItem, Paper, Typography } from "@mui/material";
import React, { lazy, useCallback, useEffect, useState } from "react";
import { useRootFAQString } from "../contexts/TextProvider.jsx";
//import Question from "../fragments/Question";
import { usePublicResources } from "../contexts/PublicResourcesContext";

const Question = lazy(() => import("../fragments/Question.jsx"));

/**
 * React functional component for the FAQ page.
 *
 * @param {object} props - component properties
 * @returns {JSX.Element} - the FAQ page
 */
const FAQ = () => {
  const [questions, setQuestions] = useState([]);
  const rootfaq = useRootFAQString();
  const { fetch_faq } = usePublicResources();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch_faq();
      setQuestions(
        response.map((question) => ({
          ...question,
          isOpen: false,
        }))
      );
    } catch (error) {
      console.error("Error fetching Questions on FAQ: ", error);
    }
  }, [fetch_faq]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleQuestionToggle = (index) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].isOpen = !updatedQuestions[index].isOpen;
      return updatedQuestions;
    });
  };

  return (
    <Paper>
      <Typography variant="h5" padding={5}>
        {rootfaq.title}
      </Typography>

      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: "100vh",
          "& ul": { padding: 0 },
        }}
      >
        {questions.map((faq, index) => (
          <ListItem key={`${faq.id}-question-item`}>
            <Question
              key={`${faq.id}-question`}
              id={`${faq.id}-question`}
              question={faq.question}
              answer={faq.answers}
              open={faq.isOpen}
              onToggle={() => handleQuestionToggle(index)}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FAQ;
