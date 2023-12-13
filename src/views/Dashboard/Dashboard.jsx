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
import { Tabs, TabList, TabPanels, Tab, TabPanel, useToast } from "@chakra-ui/react";
//import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { getOpenQuizzes, getQuizesByIds } from "../../services/quizzes.services";
import { joinPublicQuiz, getParticipations, getInvitations, acceptInvitation, rejectInvitation } from "../../services/quizParticipation.services";
import { QuizTable } from "../../components/QuizzTable/QuizTable";
import { InvitationTable } from "../../components/InvitationTabe/InvitationTable";

export const Dashboard = () => {
  //const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();
  const [quizzes, setQuizzes] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [participations, setParticipations] = useState([]);
  const [enrolledQuizzes, setEnrolledQuizzes] = useState([]);

  const getInvitationsRequests = async () => {
    const invitations = await getInvitations(user.username);
    setInvitations(invitations);
}

const getParticipationQuizes = async () => {
  const participations = await getParticipations(user.username);
  const enrolledIds = participations.map(p => p.quizId);
  const enrolledQuizzes = await getQuizesByIds(enrolledIds);
  setEnrolledQuizzes(enrolledQuizzes);
}

  useEffect(() => {
    const fetchQuizzes = async () => {
      const allQuizzes = await getOpenQuizzes();
      console.log(allQuizzes);
      setQuizzes(allQuizzes);
    };

    

    fetchQuizzes();
    getParticipationQuizes();
    getInvitationsRequests();
  }, []);

  const handleJoinQuiz = async (quiz) => {
    console.log(quiz);
    await joinPublicQuiz(quiz.id, user.username);
    //navigate('/quiz', { state: { quizId: quiz.id } });
  };

  const handleAcceptInvitation = async (quizId) => {
    console.log(quizId);
    console.log(user.username);
    await acceptInvitation(quizId, user.username);
    await getInvitationsRequests();
    await getParticipationQuizes();
    toast({
      title: "Invitation accepted.",
      description: "You have joined the quiz.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  const handleRejectInvitation = async (quizId) => {
    
    await rejectInvitation(quizId, user.username);
    await getInvitationsRequests();
    toast({
      title: "Invitation rejected.",
      description: "You have rejected the invitation.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

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
              <Heading mb={4}>Open Quizes</Heading>
              <QuizTable quizzes={quizzes} role={user.role} handleJoinQuiz={handleJoinQuiz} />
            </Box>
          </Flex>
        </TabPanel>
        <TabPanel>
        <Flex justifyContent="center">
            <Box
              p={4}
              bg="blue.800"
              borderRadius="lg"
              boxShadow="lg"
              color="white"
            >
              <Heading mb={4}>Enrolled Quizes</Heading>
            </Box>
          </Flex>
        </TabPanel>
        <TabPanel>
        <Flex justifyContent="center">
            <Box
              p={4}
              bg="blue.800"
              borderRadius="lg"
              boxShadow="lg"
              color="white"
            >
              <Heading mb={4}>Invitations</Heading>
              <InvitationTable invitations={invitations} role={user.role} 
              handleAcceptInvitation={handleAcceptInvitation}
              handleRejectInvitation={handleRejectInvitation}
              />
            </Box>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
