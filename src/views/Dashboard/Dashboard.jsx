import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Heading,
  Flex,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
//import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { getOpenQuizzes, getQuizesByIds } from "../../services/quizzes.services";
import { joinPublicQuiz, getParticipations } from "../../services/quizParticipation.services";

export const Dashboard = () => {
  //const navigate = useNavigate();
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [participations, setParticipations] = useState([]);
  const [enrolledQuizzes, setEnrolledQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const allQuizzes = await getOpenQuizzes();
      console.log(allQuizzes);
      setQuizzes(allQuizzes);
    };

    const getParticipationQuizes = async () => {
        const participations = await getParticipations(user.username);
        const enrolledIds = participations.map(p => p.quizId);
        const enrolledQuizzes = await getQuizesByIds(enrolledIds);
        setEnrolledQuizzes(enrolledQuizzes);
    }

    fetchQuizzes();
    getParticipationQuizes();
  }, []);

  const handleJoinQuiz = async (quiz) => {
    console.log(quiz);
    await joinPublicQuiz(quiz.id, user.username);
    //navigate('/quiz', { state: { quizId: quiz.id } });
  };

  return (
    <Tabs m={2}>
      <TabList>
        <Tab m={2}>Open Quizzes</Tab>
        <Tab m={2}>Enrolled Quizzes</Tab>
        <Tab m={2}>Invitations</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Flex justifyContent="center">
            <Box
              p={4}
              bg="blue.800"
              borderRadius="lg"
              boxShadow="lg"
              color="white"
            >
              <Heading mb={4}>Welcome, {user.username}</Heading>
              <Divider mb={4} />
              <Text mb={4}>Quizzes available:</Text>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Timer</Th>
                    <Th>Category</Th>
                    <Th>Type</Th>
                    <Th>Total Points</Th>
                    <Th>Start Date</Th>
                    <Th>End Date</Th>
                    {/* <Th>Active Time</Th> */}
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {quizzes.length > 0 &&
                    quizzes.map((quiz, index) => (
                      <Tr key={index}>
                        <Td>{quiz.title}</Td>
                        <Td>{quiz.timerDuration || ""}</Td>
                        <Td>
                          <Text>{quiz.category}</Text>
                        </Td>
                        <Td>{quiz.type}</Td>
                        <Td>{quiz.totalPoints || ""}</Td>
                        <Td>{quiz.startDate || ""}</Td>
                        <Td>{quiz.endDate || ""}</Td>
                        {/* <Td><ActiveTimer activeTime={quiz.activeTime} quizId={quiz.id} /></Td> */}
                        <Td>
                          <Button
                            colorScheme="blue"
                            onClick={() => handleJoinQuiz(quiz)}
                          >
                            Join
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </TabPanel>
        <TabPanel>{/* Display invitational quizzes here */}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
