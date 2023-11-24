import React from 'react';
import { Box, Button, Text, CircularProgress, CircularProgressLabel, Flex } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

export const QuizResults = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { score, totalQuestions, correctAnswers, wrongAnswers } = location.state || {};
    const percentage = score && totalQuestions ? Math.round((score / totalQuestions) * 100) : 0;

    const handleRetry = () => {
        navigate('/sampleQuiz');
    };

    const handleExit = () => {
        navigate('/');
    };

    return (
        <Box p="6" rounded="md" bg="white">
            <Flex justify="center" align="center" mb="4">
                <CircularProgress value={percentage} color="green.400" size="120px">
                    <CircularProgressLabel>{percentage}%</CircularProgressLabel>
                </CircularProgress>
            </Flex>

            <Text fontSize="xl" mb="2">Score: {score} / {totalQuestions}</Text>
            <Text fontSize="xl" mb="2">Correct answers: {correctAnswers}</Text>
            <Text fontSize="xl" mb="2">Wrong answers: {wrongAnswers}</Text>

            <Button colorScheme="teal" mr="4" onClick={handleRetry}>Retry Quiz</Button>
            <Button colorScheme="red" onClick={handleExit}>Exit</Button>
        </Box>
    );
};