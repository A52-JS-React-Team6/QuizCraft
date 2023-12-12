import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  Spacer,
  Textarea,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import PropTypes from "prop-types";
import { QuestionDifficulty } from "../../services/question.services";

export const CreateQuestionView = ({ questionIndex, onSaveQuestion }) => {
  const [question, setQuestion] = useState({
    text: "",
    answers: [""],
    correctAnswer: "",
    difficulty: "easy"
  });
  const [difficulty, setDifficulty] = useState(Object.keys(QuestionDifficulty)[0]);

  const selectDifficulty = (e) => {
    const difficultyValue = e.target.value;
    setDifficulty(difficultyValue);
    setQuestion({ ...question, difficulty: difficultyValue });
    console.log(question)
  };
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState();
  const setCorrectAnswer = (e,checked, answerIndex) => {
    if(checked) {
        setQuestion({...question, correctAnswer: question.answers[answerIndex]});
        setCorrectAnswerIndex(answerIndex);
    }
};
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
        <Textarea
          defaultValue={question.text}
          placeholder="Question text"
          onChange={(e) => handleQuestionTextChange(e.target.value)}
        />
      </FormControl>
      <FormControl m={2}>
        <FormLabel>Difficulty</FormLabel>
        <Select value={difficulty} onChange={selectDifficulty}>
        {Object.keys(QuestionDifficulty).map((difficulty, index) => (
          <option style={{ color: "blue" }} key={index} value={difficulty}>
            {difficulty}
          </option>
        ))}
       </Select>
      </FormControl>
      
      {question.answers.map((answer, answerIndex) => (
        <Flex align="start" key={answerIndex} m={2}>
           <Box w="20%">
           <FormControl>
                <FormLabel>Correct</FormLabel>
                <Checkbox checked={correctAnswerIndex === answerIndex} onChange={(e) => setCorrectAnswer(e,e.target.checked, answerIndex)} />
            </FormControl>
           </Box>
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
        colorScheme="blue"
        mt={3}
        onClick={() => onSaveQuestion(question)}
      >
        Save Question
      </Button>
      </Flex>
    </Box>
  );
};

CreateQuestionView.propTypes = {
  questionIndex: PropTypes.number.isRequired,
  onSaveQuestion: PropTypes.func.isRequired,
};