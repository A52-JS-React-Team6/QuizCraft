import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

export const CreateQuestionView = ({ questionIndex, onSaveQuestion }) => {
  const [question, setQuestion] = useState({
    text: "",
    answers: [""],
    correctAnswer: "",
  });
  const handleQuestionTextChange = (text) => {
    const newQuestion = { ...question };
    newQuestion.text = text;
    setQuestion(newQuestion);
  };
  const handleAnswerChange = (answerIndex, text) => {
    const newQuestion = { ...question };
    newQuestion.answers[answerIndex] = text;
    setQuestion(newQuestion);
  };
  const addAnswer = () => {
    const newQuestion = { ...question };
    newQuestion.answers.push("");
    setQuestion(newQuestion);
  };
  const removeAnswer = ( answerIndex) => {
    const newQuestion = { ...question };
    newQuestion.answers.splice(answerIndex, 1);
    setQuestion(newQuestion);
  };

  return (
    <Box m={2} p={2}>
      <FormControl id={`question-${questionIndex}`} m={2}>
        <FormLabel>Question {questionIndex + 1}</FormLabel>
        <Input
          defaultValue={question.text}
          placeholder="Question text"
          onChange={(e) => handleQuestionTextChange(e.target.value)}
        />
      </FormControl>
      {question.answers.map((answer, answerIndex) => (
        <Flex align="center" key={answerIndex} m={2}>
          <FormControl
            id={`question-${questionIndex}-answer-${answerIndex}`}
            mr={2}
          >
            <FormLabel>Answer {answerIndex + 1}</FormLabel>
            <Input
              value={answer}
              onChange={(e) =>
                handleAnswerChange(answerIndex, e.target.value)
              }
            />
          </FormControl>
          <Spacer />
          <IconButton
            mt={8}
            aria-label="Remove answer"
            icon={<CloseIcon />}
            onClick={() => removeAnswer(answerIndex)}
          />
        </Flex>
      ))}

      <Button
        color="blue.800"
        mt={5}
        mr={2}
        onClick={() => addAnswer()}
        leftIcon={<AddIcon />}
      >
        Add Answer
      </Button>

      <Flex justifyContent="center">
      <Button
        colorScheme="green"
        mt={3}
        onClick={() => onSaveQuestion(question)}
      >
        Save Question
      </Button>
      </Flex>
    </Box>
  );
};
