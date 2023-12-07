import React from 'react';
import { Box, Button, Text, CircularProgress, CircularProgressLabel, Flex } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { addQuizParticipant, storeQuizResult } from '../../services/quizzes.services';

export const QuizResults = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
 


    const { score, totalQuestions, correctAnswers, wrongAnswers, quizId } = location.state || {};
    const percentage = score && totalQuestions ? Math.round((score / totalQuestions) * 100) : 0;
    console.log('quizId:', quizId); // Add this line
    const handleExit = async () => {
      // Save the quiz result to Firebase
      await storeQuizResult(user.username, quizId, percentage);
    
      // Add the user to the participants of the quiz
      await addQuizParticipant(quizId, user.username, percentage);
    
      // Check if the user is logged in
      if (user?.isLoggedIn ) {
        // If the user is logged in, navigate to the student dashboard
        navigate('/student-dashboard')
      } else {
        // If the user is not logged in, navigate to the home page
        navigate('/');
      }
    };

    return (
        <Flex justifyContent="center" >
        <Box p={4}>
            <Flex justify="center" align="center" mb="4">
                <CircularProgress value={percentage} color="green.400" size="120px">
                    <CircularProgressLabel>{percentage}%</CircularProgressLabel>
                </CircularProgress>
            </Flex>

            <Text fontSize="xl" mb="2">Score: {score} / {totalQuestions}</Text>
            <Text fontSize="xl" mb="2">Correct answers: {correctAnswers}</Text>
            <Text fontSize="xl" mb="2">Wrong answers: {wrongAnswers}</Text>

            {/* <Button bg='#4CAF50' colorScheme="teal" mr="4" onClick={handleRetry}>Retry Quiz</Button> */}
            <Button colorScheme="red" onClick={handleExit}>Exit</Button>
        </Box>
        </Flex>
    );
};