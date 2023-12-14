import { Box, Button, Text, CircularProgress, CircularProgressLabel, Flex } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { addQuizParticipant, storeQuizResult } from '../../services/quizzes.services';

export const QuizResults = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();



  const { score, totalPoints, totalQuestions, correctAnswers, wrongAnswers, quizId } = location.state || {};
  const percentage = score && totalPoints ? Math.round((score / totalPoints) * 100) : 0;

  const handleExit = async () => {
    if (user) {
      await storeQuizResult(user.username, quizId, percentage);
      await addQuizParticipant(quizId, user.username, percentage);
    }

    if (user && user.isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <Flex justifyContent="center" >
      <Box p={4}>
        {/* <Flex justify="center" align="center" mb="4">
          <CircularProgress value={percentage} color="green.400" size="120px">
            <CircularProgressLabel>{percentage}%</CircularProgressLabel>
          </CircularProgress>
        </Flex> */}

        <Text fontSize="xl" mb="2">Score: {score} / {totalPoints}</Text>
        <Text fontSize="xl" mb="2">Correct answers: {correctAnswers}</Text>
        <Text fontSize="xl" mb="2">Wrong answers: {wrongAnswers}</Text>

        <Button colorScheme="red" onClick={handleExit}>Exit</Button>
      </Box>
    </Flex>
  );
};