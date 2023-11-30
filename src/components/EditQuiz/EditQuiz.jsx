import { Box, Text, Heading, Button, FormControl, FormLabel, Input, Select, Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";

export function EditQuiz({ quiz, onSave }) {
    const [title, setTitle] = useState(quiz.title);
    const [category, setCategory] = useState(quiz.category);
    const [type, setType] = useState(quiz.type);
    const [timer, setTimer] = useState(quiz.timer);
    const [maxPoints, setMaxPoints] = useState(quiz.maxPoints);
    const [showQuestions, setShowQuestions] = useState(false);
    const [questions, setQuestions] = useState([
        { question: 'I have 18 lollipops. One half of them are red, one third of them are blue. How many lollipops are not red or blue?', answers: ['A 5', 'B 4', 'C 3', 'D 2'], correct: 'C 3' },
        { question: 'I have 18 lollipops. One half of them are red, one third of them are blue. How many lollipops are not red or blue?', answers: ['A 5', 'B 4', 'C 3', 'D 2'], correct: 'C 3' },
        { question: 'I have 18 lollipops. One half of them are red, one third of them are blue. How many lollipops are not red or blue?', answers: ['A 5', 'B 4', 'C 3', 'D 2'], correct: 'C 3' },
        { question: 'I have 18 lollipops. One half of them are red, one third of them are blue. How many lollipops are not red or blue?', answers: ['A 5', 'B 4', 'C 3', 'D 2'], correct: 'C 3' },
        { question: 'I have 18 lollipops. One half of them are red, one third of them are blue. How many lollipops are not red or blue?', answers: ['A 5', 'B 4', 'C 3', 'D 2'], correct: 'C 3' },
        { question: 'I have 18 lollipops. One half of them are red, one third of them are blue. How many lollipops are not red or blue?', answers: ['A 5', 'B 4', 'C 3', 'D 2'], correct: 'C 3' },
        { question: 'I have 18 lollipops. One half of them are red, one third of them are blue. How many lollipops are not red or blue?', answers: ['A 5', 'B 4', 'C 3', 'D 2'], correct: 'C 3' },
        { question: 'I have 18 lollipops. One half of them are red, one third of them are blue. How many lollipops are not red or blue?', answers: ['A 5', 'B 4', 'C 3', 'D 2'], correct: 'C 3' },
        { question: 'I have 18 lollipops. One half of them are red, one third of them are blue. How many lollipops are not red or blue?', answers: ['A 5', 'B 4', 'C 3', 'D 2'], correct: 'C 3' },
        { question: 'I have 18 lollipops. One half of them are red, one third of them are blue. How many lollipops are not red or blue?', answers: ['A 5', 'B 4', 'C 3', 'D 2'], correct: 'C 3' },
    ]);
    const [showAnswers, setShowAnswers] = useState(questions.map(() => false));

    const handleQuestionChange = (value, index) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { text: '', answers: [], correct: '' }]);
    };

    const removeQuestion = (index) => {
        setQuestions(questions.filter((_, questionIndex) => questionIndex !== index));
    };

    const removeAnswer = (questionIndex, answerIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers = newQuestions[questionIndex].answers.filter((_, index) => index !== answerIndex);
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (questionIndex, answerIndex, text) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers[answerIndex] = text;
        setQuestions(newQuestions);
    };

    const handleAddAnswer = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers.push('');
        setQuestions(newQuestions);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave({ ...quiz, title, category, type, timer, maxPoints, questions });
    };

    const toggleShowAnswers = (index) => {
        setShowAnswers(showAnswers.map((value, i) => i === index ? !value : value));
    };

    return (
        <Box p={4}>
            <Heading mt={2} mb={10} ml={4} mr={4}>Edit Quiz</Heading>
            <Flex mt={2} mb={2} justifyContent="space-between">
                <Text mt={2} mb={2}>Created on: {quiz.createdOn}</Text>
                <Text mt={2} mb={2}>Category: {quiz.category}</Text>
                <Text mt={2} mb={2}>Created by: {quiz.createdBy} (Role: {quiz.role})</Text>
            </Flex>
            <Flex justifyContent="space-between" mt={2} mb={2}>
                <Text mt={2} mb={2}>Type: {quiz.type}</Text>
                <Box mt={2} mb={2} ml="114px" flex={1} textAlign="center">
                    <Text mt={2} mb={2}>{quiz.title}</Text>
                </Box>
                <Flex mt={2} mb={2} mr="8px">
                    <Text mt={2} mb={2}>Timer: {quiz.timer}</Text>
                    <Text mt={2} mb={2} ml={2}>Maximum Points: {quiz.maxPoints}</Text>
                </Flex>
            </Flex>
            <Box align="left" mt={2} mb={2}>
                <form onSubmit={handleSubmit}>
                    <FormControl mt={2} mb={2} id="title">
                        <FormLabel mt={2} mb={2}>Title</FormLabel>
                        <Input mt={2} mb={2} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </FormControl>
                    <FormControl mt={2} mb={2} id="category">
                        <FormLabel mt={2} mb={2}>Category</FormLabel>
                        <Input mt={2} mb={2} type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </FormControl>
                    <FormControl mt={2} mb={2} id="type">
                        <FormLabel mt={2} mb={2}>Type</FormLabel>
                        <Select mt={2} mb={2} color="white" value={type} onChange={(e) => setType(e.target.value)}>
                            <option mt={2} mb={2} style={{ color: "black" }} value="Open">Open</option>
                            <option mt={2} mb={2} style={{ color: "black" }} value="Invitational">Invitational</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={2} mb={2} id="timer">
                        <FormLabel mt={2} mb={2}>Timer</FormLabel>
                        <Select mt={2} mb={2} color="white" value={timer} onChange={(e) => setTimer(e.target.value)}>
                            <option mt={2} mb={2} style={{ color: "black" }} value="15 minutes">15 minutes</option>
                            <option mt={2} mb={2} style={{ color: "black" }} value="30 minutes">30 minutes</option>
                            <option mt={2} mb={2} style={{ color: "black" }} value="45 minutes">45 minutes</option>
                            <option mt={2} mb={2} style={{ color: "black" }} value="1 hour">1 hour</option>
                            <option mt={2} mb={2} style={{ color: "black" }} value="1 hour and 30 minutes">1 hour and 30 minutes</option>
                            <option mt={2} mb={2} style={{ color: "black" }} value="2 hours">2 hours</option>
                            <option mt={2} mb={2} style={{ color: "black" }} value="2 hours and 30 minutes">2 hours and 30 minutes</option>
                            <option mt={2} mb={2} style={{ color: "black" }} value="3 hours">3 hours</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={2} mb={2} id="maxPoints">
                        <FormLabel mt={2} mb={2}>Maximum Points</FormLabel>
                        <Input mt={2} mb={2} type="number" value={maxPoints} onChange={(e) => setMaxPoints(e.target.value)} />
                    </FormControl>
                    <Flex justifyContent="center" mt={4}>
                        <Button colorScheme="blue" onClick={() => setShowQuestions(!showQuestions)}>
                            {showQuestions ? 'Hide Questions' : 'Show Questions'}
                        </Button>
                    </Flex>
                    {showQuestions && questions.map((question, questionIndex) => (
                        <Box mt={2} mb={2} key={questionIndex} w="full">
                            <Flex align="center" justifyContent="center">
                                <FormControl mt={2} mb={2} id={`question-${questionIndex}`} flex="1">
                                    <FormLabel mt={2} mb={2}>Question {questionIndex + 1}</FormLabel>
                                    <Input mt={2} mb={2} type="text" value={question.question} onChange={(e) => handleQuestionChange(e.target.value, questionIndex)} />
                                </FormControl>
                                <IconButton mt={12} mb={2} ml={2} aria-label="Remove question" icon={<CloseIcon />} onClick={() => removeQuestion(questionIndex)} />
                            </Flex>
                            <Flex justifyContent="center" mt={4}>
                                <Button colorScheme="blue" onClick={() => toggleShowAnswers(questionIndex)}>
                                    {showAnswers[questionIndex] ? 'Hide Answers' : 'Show Answers'}
                                </Button>
                            </Flex>
                            {showAnswers[questionIndex] && (
                                <>
                                    {question.answers.map((answer, answerIndex) => (
                                        <Flex mt={2} mb={2} key={answerIndex} align="center" justifyContent="center">
                                            <FormControl mt={2} mb={2} id={`question-${questionIndex}-answer-${answerIndex}`} flex="1">
                                                <FormLabel mt={2} mb={2}>Answer {answerIndex + 1}</FormLabel>
                                                <Input mt={2} mb={2} value={answer} onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)} />
                                            </FormControl>
                                            {question.answers.length > 1 && <IconButton mt={12} mb={2} ml={2} aria-label="Remove answer" icon={<CloseIcon />} onClick={() => removeAnswer(questionIndex, answerIndex)} />}
                                        </Flex>
                                    ))}
                                    <Flex justifyContent="center" mt={4}>
                                        <Button colorScheme="blue" onClick={() => handleAddAnswer(questionIndex)}>Add Answer</Button>
                                    </Flex>
                                </>
                            )}
                        </Box>
                    ))}
                    {showQuestions && (
                        <Flex justifyContent="center" mt={4}>
                            <Button colorScheme="blue" onClick={handleAddQuestion}>Add Question</Button>
                        </Flex>
                    )}
                    <Flex justifyContent="center" mt={4}>
                        <Button colorScheme="blue" type="submit">
                            Save Changes
                        </Button>
                    </Flex>
                </form>
            </Box>
        </Box>
    );
}