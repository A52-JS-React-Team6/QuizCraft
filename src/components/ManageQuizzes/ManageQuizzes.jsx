import { Box, Heading, List } from "@chakra-ui/react";
import { QuizItem } from "../../views/Quizitem/Quizitem";
import { getAllQuizzes } from "../../services/quizzes.services";
import { useState, useEffect } from 'react';
import { deleteQuiz } from '../../services/quizzes.services';
import { useToast } from "@chakra-ui/react";
import { updateQuiz } from '../../services/quizzes.services';

export const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const fetchedQuizzes = await getAllQuizzes();
      setQuizzes(fetchedQuizzes);
    };

    fetchQuizzes();
  }, []);

  const handleSaveQuiz = async (updatedQuiz) => {
    await updateQuiz(updatedQuiz.id, updatedQuiz);
  
    toast({
      title: "Your changes have been saved.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteQuiz = async (id) => {
    await deleteQuiz(id);
    setQuizzes(quizzes.filter(quiz => quiz.id !== id));

    toast({
      title: "The quiz has been successfully deleted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };


  return (
    <Box p={4}>
      <Heading m={4}>Manage Quizzes</Heading>
      <List spacing={3}>
        {quizzes.map(quiz => (
          <QuizItem key={quiz.id} quiz={quiz} onDelete={handleDeleteQuiz} onSave={handleSaveQuiz} />
        ))}
      </List>
    </Box>
  );
}