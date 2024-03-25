import {
  CircularProgress,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useEffect, useState, useCallback } from "react";
import { useRootFAQString } from "../contexts/TextProvider";
//import Question from "../fragments/Question";
import { usePublicResources } from "../contexts/PublicResourcesContext";

const Question = lazy(() => import("../fragments/Question"));

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
    const response = await fetch_faq();
    setQuestions(
      response.map((question) => ({
        ...question,
        isOpen: false,
      }))
    );
  }, [setQuestions, fetch_faq]);
  /**
   * Adds the middleware that fetches and sets questions from React's back page
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * Toggles the state of the question at the given index. This is used to prevent an unintended change in the state
   *
   * @param {number} index - index of the question to toggle
   */
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
        <Suspense
          fallback={
            <div style={{ padding: 20 }}>
              <CircularProgress />
            </div>
          }
        >
          {questions.map((faq, index) => (
            <ListItem key={index}>
              <Question
                key={index + "q"}
                question={faq.question}
                answer={faq.answers}
                open={faq.isOpen}
                onToggle={() => handleQuestionToggle(index)}
              />
            </ListItem>
          ))}
        </Suspense>
      </List>
    </Paper>
  );
};

export default FAQ;
