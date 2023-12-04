import { Box, Heading, List, Divider, useColorModeValue } from "@chakra-ui/react";
import { QuizItem } from "../../views/Quizitem/Quizitem";
import { getAllQuizzes } from "../../services/quizzes.services";
import { useState, useEffect } from 'react';
import { deleteQuiz } from '../../services/quizzes.services';
import { useToast } from "@chakra-ui/react";
import { updateQuiz } from '../../services/quizzes.services';
import React from 'react';

export const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const toast = useToast();
  const evenBgColor = useColorModeValue("#007ACC", "rgba(0, 122, 204, 0.1)");

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
        {quizzes.map((quiz, index) => (
          <React.Fragment key={quiz.id}>
            <Box p={4} my={2} bg={index % 2 !== 0 ? evenBgColor : "transparent"}>
              <QuizItem quiz={quiz} onDelete={handleDeleteQuiz} onSave={handleSaveQuiz} />
            </Box>
            {index < quizzes.length - 1 && <Divider my={2} />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}