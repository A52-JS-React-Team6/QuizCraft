import React, { useState } from 'react';
import { Box, Button, Text, Heading, Flex, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const SampleQuiz = () => {
    const questions = [
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
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const navigate = useNavigate();

    const handleAnswerOptionClick = (answer) => {
        if (!isAnswered) {
            setSelectedAnswer(answer);
            if (answer === questions[currentQuestion].correct) {
                setScore(score + 1);
            }
            setIsAnswered(true);
        }
    };

    const handleNextButtonClick = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setShowScore(true);
        }
    };

    const handleFinishButtonClick = () => {
        const correctAnswers = score;
        const wrongAnswers = questions.length - score;
        navigate('/quiz-results', { state: { score, totalQuestions: questions.length, correctAnswers, wrongAnswers } });
    };

    return (
        <Box
            bg="blue.800"
            color="white"
            p="20px"
            w="100%"
            h="auto"
            d="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mx="auto"
            height = "100vh"
            width="150vh"
        >
            <Heading mb="20px" color="white">Math Quiz for Kids</Heading>
            <Flex justifyContent="space-between" width="100%" mb="20px">
                <Text color="#green">View Progress</Text>
                <Text>Score: {score}/{questions.length}</Text>
            </Flex>
            <Divider borderColor="whiteOrange" mb="20px" />
            <Box width="100%" mb="20px">
                <Text
                    fontSize="24px"
                    fontWeight="bold"
                    color="whiteOrange"
                >
                    {questions[currentQuestion].question}
                </Text>
            </Box>

            <Flex direction="column" width="100%" mb="20px">
                {questions[currentQuestion].answers.map((answer, index) => (
                    <Flex
                        as="button"
                        key={index}
                        onClick={() => handleAnswerOptionClick(answer)}
                        bg={selectedAnswer === answer
                            ? answer === questions[currentQuestion].correct
                                ? "#4CAF50"
                                : "#F44336"
                            : "#EC8F5E"}
                        color="white"
                        m="5px 0"
                        p="20px"
                        borderRadius="20px"
                        alignItems="center"
                        justifyContent="flex-start"
                        width="100%"
                        _hover={{ bg: "whiteOrange" }}
                    >
                        {answer}
                    </Flex>
                ))}
            </Flex>

            <Divider borderColor="whiteOrange" mb="20px" />

            <Flex justifyContent="space-between" width="100%" mb="20px">
                <Text color="yellow">{currentQuestion + 1} of {questions.length} Questions</Text>
                {selectedAnswer && (
                    <Button
                        bg="#4CAF50"
                        p="10px 20px"
                        borderRadius="20px"
                        _hover={{ bg: "whiteOrange" }}
                        width="auto"
                        onClick={handleNextButtonClick}
                    >
                        Next
                    </Button>
                )}
            </Flex>
            {selectedAnswer && (
                <Text fontStyle="italic" color="yellow">
                    {selectedAnswer === questions[currentQuestion].correct
                        ? `Correct Answer: ${selectedAnswer}`
                        : `Incorrect Answer: ${selectedAnswer}`}
                </Text>
            )}

            {selectedAnswer && selectedAnswer !== questions[currentQuestion].correct && (
                <Text fontStyle="italic" color="yellow">
                    Correct Answer: {questions[currentQuestion].correct}
                </Text>
            )}

            {showScore && (
                <Button bg='#4CAF50' marginTop={5} marginBot={5} onClick={handleFinishButtonClick}>Finish</Button>
            )}
        </Box>
    );
};