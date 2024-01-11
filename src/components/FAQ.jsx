import { Paper, Typography } from "@mui/material";
import axios from "axios"; // Asegúrate de importar axios
import React from "react";
import { useFAQString } from "../contexts/TextProvider";
import Question from "../fragments/Question";

const FAQ = (props) => {
  const [questions, setQuestions] = React.useState([]);
  const labels = useFAQString();

  // Adds the middleware that fetches and sets questions from React's back page
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let url = process.env.REACT_APP_BACK_URL;
        const response = await axios.post(url + "/api/resources/getQuestions");
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

  // Toggles the state of the question at the given index. This is used to prevent an unintended change in the state
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
        {labels.title}
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
