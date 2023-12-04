import React, { useState, useEffect } from 'react';
import { ListItem, Flex, Text, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { EditQuiz } from "../../components/EditQuiz/EditQuiz";
import { deleteQuiz } from '../../services/quizzes.services';
import { useToast } from "@chakra-ui/react";
import { getStudents } from '../../services/user.services';

export const QuizItem = ({ quiz, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [students, setStudents] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const students = await getStudents();
      console.log(students)
      setStudents(students);
    };

    fetchStudents();
  }, []);

  const toast = useToast();
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedQuiz) => {
    onSave(updatedQuiz);
    setIsEditing(false);
  };

  const handleButtonClick = () => {
    setDropdownVisible(!isDropdownVisible);
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
            <Button colorScheme="red" ml={2} onClick={() => onDelete(quiz.id)}>
              Delete Quiz
            </Button>
            <Menu>
              <MenuButton as={Button} colorScheme="green" onClick={handleButtonClick}>
                Invite Students
              </MenuButton>
              {isDropdownVisible && (
                <MenuList>
                  {students.map((student, index) => (
                    <MenuItem color="blue.800" key={index}>{student.username}
                    </MenuItem>
                  ))}
                </MenuList>
              )}
            </Menu>
          </Flex>
        </>
      )}
    </ListItem>
  );
};