import React, { useState, useEffect } from 'react';
import { Box, Button, Menu, MenuButton, MenuList, MenuItem, Flex, Text} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { getStudents } from '../../services/user.services';
import { getOngoingQuizzes, getFinishedQuizzes } from '../../services/quizzes.services';
import { ActiveTimer } from '../ActiveTimer/ActiveTimer';

export const EducatorDashboard = () => {

    const [students, setStudents] = useState([]);
    const [ongoingQuizzes, setOngoingQuizzes] = useState([]);
    const [finishedQuizzes, setFinishedQuizzes] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
          const students = await getStudents();
          setStudents(students);
        };
    
        fetchStudents();
      }, []);

      useEffect(() => {
        const getQuizzes = async () => {
          const quizzes = await getFinishedQuizzes();
          setFinishedQuizzes(quizzes);
        };
    
        getQuizzes();
      }, []);

      const handleCheckStudents = async () => {
        const students = await getStudents();
        setStudents(students);
      };
      
      const handleCheckOngoingQuizzes = async () => {
        const quizzes = await getOngoingQuizzes();
        setOngoingQuizzes(quizzes);
      };

      const handleCheckFinishedQuizzes = async () => {
        const quizzes = await getFinishedQuizzes();
        setFinishedQuizzes(quizzes);
      };

  return (
    <Box height="500px">
  <Menu>
  <MenuButton width="250px" as={Button} rightIcon={<ChevronDownIcon />} onClick={handleCheckOngoingQuizzes}>
    Check Ongoing Quizzes
  </MenuButton>
  <MenuList color="black" maxHeight="400px" width="250px" overflowY="auto">
  {ongoingQuizzes.map((quiz, index) => (
    <MenuItem key={index}>
      <Flex align="center" justify="space-between">
        <Text>{quiz.title}</Text>
        {/* <ActiveTimer activeTime={quiz.activeTime} quizId={quiz.id} /> */}
      </Flex>
    </MenuItem>
  ))}
</MenuList>
</Menu>
<Menu>
  <MenuButton width="250px" as={Button} rightIcon={<ChevronDownIcon />} onClick={handleCheckFinishedQuizzes}>
    Check Finished Quizzes
  </MenuButton>
  <MenuList color="black" maxHeight="400px" width="250px" overflowY="auto">
    {finishedQuizzes
      .filter(quiz => quiz.title)
      .map((quiz, index) => (
        <MenuItem key={index}>
          <Flex align="center" justify="space-between">
            <Text>{quiz.title}</Text>
            {/* <ActiveTimer activeTime={quiz.activeTime} quizId={quiz.id} /> */}
          </Flex>
        </MenuItem>
    ))}
  </MenuList>
</Menu>
      <Menu>
  <MenuButton width="250px" as={Button} rightIcon={<ChevronDownIcon />} onClick={handleCheckStudents}>
    Check Students
  </MenuButton>
  <MenuList maxHeight="400px" width="250px"  overflowY="auto">
  {students.map((student, index) => (
    <MenuItem color="black" key={index}>{student.username}</MenuItem>
  ))}
</MenuList>
</Menu>
    </Box>
  );
};