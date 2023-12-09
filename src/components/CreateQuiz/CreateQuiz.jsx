import { useState } from "react";
import {
  Box,
  Button,
  Spacer,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Stack,
  Textarea,
  IconButton,
  FormErrorMessage,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";
import { useAuth } from "../../context/AuthContext";
import {
  createQuiz,
  QuizCategories,
  QuizTimer,
  QuizTypes,
} from "../../services/quizzes.services";
import { LoadQuestionsModal } from "./LoadQuestionsModal";
import { CreateQuestionsModal } from "./CreateQuestionModal";
import { useNavigate } from "react-router";

export const CreateQuiz = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(QuizCategories[0]);
  const [type, setType] = useState(QuizTypes[0]);
  const [timer, setTimer] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [activeTime, setActiveTime] = useState(0);
  const [attemptTime, setAttemptTime] = useState(0);
  const navigate = useNavigate();
  const {
    isOpen: isLoadQuestionsOpen,
    onOpen: onOpenLoadQuestions,
    onClose: onCloseLoadQuestions,
  } = useDisclosure();
  const {
    isOpen: isCreateQuestionsOpen,
    onOpen: onOpenCreateQuestions,
    onClose: onCloseCreateQuestions,
  } = useDisclosure();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (user.isEducator) {
    try {
      await createQuiz(title, category, type, user.username, questions, timer, activeTime, attemptTime);
    } catch (error) {
      console.error("Failed to create quiz:", error);
    }
    navigate("/manage-quizzes");
    // setTitle("");
    // setCategory("");
    // setType("");
    // setTimer(false);
    // setQuestions([]);
    // }
  };

  const handleQuestionChange = (index, text) => {
    const newQuestions = [...questions];
    newQuestions[index].text = text;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, text) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = text;
    setQuestions(newQuestions);
  };

  // const addQuestion = () => {
  //     setQuestions([...questions, { text: '', answers: [''] }]);
  // };

  const addAnswer = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].answers.push("");
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    setQuestions(
      questions.filter((_, questionIndex) => questionIndex !== index)
    );
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers = newQuestions[
      questionIndex
    ].answers.filter((_, index) => index !== answerIndex);
    setQuestions(newQuestions);
  };

  const selectCategory = async (e) => {
    const category = e.target.value;
    setCategory(category);
  };

  const selectType = async (e) => {
    const type = e.target.value;
    setType(type);
  };

  const handleBankClose = (selectedQuestions) => {
    if (selectedQuestions) {
      setQuestions((prevQuestions) => prevQuestions.concat(selectedQuestions));
    }
    onCloseLoadQuestions();
  };

  const handleQuestionSaveClose = (newQuestion) => {
    if (newQuestion) {
      setQuestions([...questions, newQuestion]);
    }
    onCloseCreateQuestions();
  };

  return (
    <Flex justifyContent="center">
      <Box as="form" w="2xl" p="6" onSubmit={handleSubmit}>
        <Heading m={4}>Create Quiz</Heading>
        <Stack spacing="6">
          <FormControl id="title" isInvalid={!!titleError}>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => {
                const value = e.target.value;
                setTitle(value);
                if (value.length < 3 || value.length > 30) {
                  setTitleError("Title must be between 3 and 30 characters");
                } else {
                  setTitleError("");
                }
              }}
            />
            <FormErrorMessage>{titleError}</FormErrorMessage>
          </FormControl>

          <FormControl id="category">
            <FormLabel>Category</FormLabel>
            <Select value={category} onChange={selectCategory}>
              {QuizCategories.map((category, index) => (
                <option style={{ color: "blue" }} key={index} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            {/* <Input value={category} onChange={(e) => setCategory(e.target.value)} /> */}
          </FormControl>

          <FormControl id="type">
            <FormLabel>Type</FormLabel>
            <Select value={type} onChange={selectType}>
              {QuizTypes.map((type, index) => (
                <option style={{ color: "blue" }} key={index} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="activeTime">
            <FormLabel>Active Time (in hours)</FormLabel>
            <Input
              type="number"
              value={activeTime}
              onChange={(e) => setActiveTime(e.target.value)}
            />
          </FormControl>

          <FormControl id="attemptTime">
            <FormLabel>Attempt Time (in minutes)</FormLabel>
            <Input
              type="number"
              value={attemptTime}
              onChange={(e) => setAttemptTime(e.target.value)}
            />
          </FormControl>

          <FormControl id="timer">
            <Flex align="center">
              <FormLabel mb="0">Timer</FormLabel>
              <Spacer />
              <Checkbox
                isChecked={timer}
                onChange={(e) => setTimer(e.target.checked)}
              >
                Include a timer
              </Checkbox>
            </Flex>
          </FormControl>

          {timer && (
            <FormControl id="timer-duration">
              <FormLabel>Timer Duration</FormLabel>
              <Select>
                {QuizTimer.map((timer, index) => (
                  <option style={{ color: "blue" }} key={index} value={timer}>
                    {timer}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}

          {questions.map((question, questionIndex) => (
            <Box key={questionIndex}>
              <FormControl id={`question-${questionIndex}`}>
                <FormLabel>Question {questionIndex + 1}</FormLabel>
                <Textarea
                  value={question.text}
                  onChange={(e) =>
                    handleQuestionChange(questionIndex, e.target.value)
                  }
                />
              </FormControl>
              {question.answers.map((answer, answerIndex) => (
                <Flex align="center" key={answerIndex}>
                  <FormControl
                    id={`question-${questionIndex}-answer-${answerIndex}`}
                    mr={2}
                  >
                    <FormLabel>Answer {answerIndex + 1}</FormLabel>
                    <Input
                      value={answer}
                      onChange={(e) =>
                        handleAnswerChange(
                          questionIndex,
                          answerIndex,
                          e.target.value
                        )
                      }
                    />
                  </FormControl>
                  <Spacer />
                  <IconButton
                    mt={8}
                    aria-label="Remove answer"
                    icon={<CloseIcon />}
                    onClick={() => removeAnswer(questionIndex, answerIndex)}
                  />
                </Flex>
              ))}

              <Button
                color="blue.800"
                mt={5}
                mr={2}
                onClick={() => addAnswer(questionIndex)}
                leftIcon={<AddIcon />}
              >
                Add Answer
              </Button>
              <IconButton
                color="blue.800"
                mt={5}
                aria-label="Remove question"
                icon={<CloseIcon />}
                onClick={() => removeQuestion(questionIndex)}
              />
            </Box>
          ))}
          <LoadQuestionsModal
            isOpen={isLoadQuestionsOpen}
            onClose={handleBankClose}
            category={category}
          />
          <CreateQuestionsModal
            isOpen={isCreateQuestionsOpen}
            onClose={handleQuestionSaveClose}
            questionIndex={questions.length}
          />

          <Button
            color="blue.800"
            onClick={() => onOpenCreateQuestions()}
            leftIcon={<AddIcon />}
          >
            Add Question
          </Button>
          <Button
            color="blue.800"
            onClick={() => onOpenLoadQuestions()}
            leftIcon={<AddIcon />}
          >
            Add from Question Bank
          </Button>
          <Button color="blue.800" type="submit" onClick={handleSubmit}>
            Finish
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};
