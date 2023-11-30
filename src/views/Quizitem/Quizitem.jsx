import React, { useState } from 'react';
import { ListItem, Flex, Text, Button } from "@chakra-ui/react";
import { EditQuiz } from "../../components/EditQuiz/EditQuiz";

export const QuizItem = ({ quiz, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedQuiz) => {
    onSave(updatedQuiz);
    setIsEditing(false);
  };

  return (
    <ListItem>
      {isEditing ? (
        <EditQuiz quiz={quiz} onSave={handleSave} />
      ) : (
        <>
          <Flex justifyContent="space-between" mb={2}>
            <Text>Created on: {quiz.createdOn}</Text>
            <Text>Category: {quiz.category}</Text>
            <Text>Created by: {quiz.createdBy} (Role: {quiz.role})</Text>
          </Flex>
          <Flex justifyContent="space-between" mb={2}>
            <Text>Type: {quiz.type}</Text>
            <Text ml="114px">{quiz.title}</Text>
            <Flex mr="8px">
              <Text>Timer: {quiz.timer}</Text>
              <Text ml={2}>Maximum Points: {quiz.maxPoints}</Text>
            </Flex>
          </Flex>
          <Flex justifyContent="center">
            <Button colorScheme="blue" onClick={handleEdit}>
              Edit Quiz
            </Button>
            <Button colorScheme="red" ml={2} >
              Delete Quiz
            </Button>
          </Flex>
        </>
      )}
    </ListItem>
  );
};