import { Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRootFAQString } from "../contexts/TextProvider";
import Question from "../fragments/Question";
/**
 * React functional component for the FAQ page.
 *
 * @param {object} props - component properties
 * @returns {JSX.Element} - the FAQ page
 */
const FAQ = () => {
  const [questions, setQuestions] = useState([]);
  const rootfaq = useRootFAQString();

  /**
   * Adds the middleware that fetches and sets questions from React's back page
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.REACT_APP_BACK_URL;
        const response = await axios.get(url + "/api/resources/getQuestions");
        setQuestions(
          response.data.map((question) => ({
            ...question,
            isOpen: false,
          }))
        );
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);

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
      {questions.map((faq, index) => (
        <Question
          key={index}
          question={faq.question}
          answer={faq.answers}
          open={faq.isOpen}
          onToggle={() => handleQuestionToggle(index)}
        />
      ))}
    </Paper>
  );
};

export default FAQ;
