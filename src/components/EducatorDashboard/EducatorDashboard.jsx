import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { getStudents } from "../../services/user.services";
import {
  getOngoingQuizzes,
  getFinishedQuizzes,
  getAllQuizzesByAuthor,
} from "../../services/quizzes.services";
//import { ActiveTimer } from '../ActiveTimer/ActiveTimer';
import { QuizTable } from "../QuizzTable/QuizTable";
import { useAuth } from "../../context/AuthContext";
import { inviteUserToQuiz, getInvitationsForEducator } from "../../services/quizParticipation.services";
import { InvitationTable } from "../InvitationTabe/InvitationTable";

export const EducatorDashboard = () => {
  const [students, setStudents] = useState([]);
  const [ongoingQuizzes, setOngoingQuizzes] = useState([]);
  const [finishedQuizzes, setFinishedQuizzes] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [myQuizzes, setMyQuizzes] = useState([]);
  const { user } = useAuth();
  const toast = useToast();
  useEffect(() => {
    const fetchStudents = async () => {
      const students = await getStudents();
      setStudents(students);
    };

    const getQuizzes = async () => {
      const myQuizzes = await getAllQuizzesByAuthor(user.username);
      setMyQuizzes(myQuizzes);
    };

    const getInvitations = async () => {
      const invitations = await getInvitationsForEducator(user.username);
      setInvitations(invitations);
    }

    fetchStudents();
    getQuizzes();
    getInvitations();
  }, [user?.username]);

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

  const handleViewResults = async (quiz) => {
    //navigate('/results', { state: { quizId: quiz.id } });
  };

  const inviteStudents = async (quiz, students) => {
    if (students.length > 0) {
      const invitePromises = students.map((student) =>
        {
          return inviteUserToQuiz(quiz.id, quiz.title, student.username, user.username)
        }
      );
      await Promise.all(invitePromises);
      toast({
        title: "Students invited successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    //     <Box height="500px">
    //   <Menu>
    //   <MenuButton width="250px" as={Button} rightIcon={<ChevronDownIcon />} onClick={handleCheckOngoingQuizzes}>
    //     Check Ongoing Quizzes
    //   </MenuButton>
    //   <MenuList color="black" maxHeight="400px" width="250px" overflowY="auto">
    //   {ongoingQuizzes.map((quiz, index) => (
    //     <MenuItem key={index}>
    //       <Flex align="center" justify="space-between">
    //         <Text>{quiz.title}</Text>
    //         {/* <ActiveTimer activeTime={quiz.activeTime} quizId={quiz.id} /> */}
    //       </Flex>
    //     </MenuItem>
    //   ))}
    // </MenuList>
    // </Menu>
    // <Menu>
    //   <MenuButton width="250px" as={Button} rightIcon={<ChevronDownIcon />} onClick={handleCheckFinishedQuizzes}>
    //     Check Finished Quizzes
    //   </MenuButton>
    //   <MenuList color="black" maxHeight="400px" width="250px" overflowY="auto">
    //     {finishedQuizzes
    //       .filter(quiz => quiz.title)
    //       .map((quiz, index) => (
    //         <MenuItem key={index}>
    //           <Flex align="center" justify="space-between">
    //             <Text>{quiz.title}</Text>
    //             {/* <ActiveTimer activeTime={quiz.activeTime} quizId={quiz.id} /> */}
    //           </Flex>
    //         </MenuItem>
    //     ))}
    //   </MenuList>
    // </Menu>
    //       <Menu>
    //   <MenuButton width="250px" as={Button} rightIcon={<ChevronDownIcon />} onClick={handleCheckStudents}>
    //     Check Students
    //   </MenuButton>
    //   <MenuList maxHeight="400px" width="250px"  overflowY="auto">
    //   {students.map((student, index) => (
    //     <MenuItem color="black" key={index}>{student.username}</MenuItem>
    //   ))}
    // </MenuList>
    // </Menu>
    //     </Box>

    <Tabs m={2}>
      <TabList>
        <Tab m={2}>Open Quizzes</Tab>
        <Tab m={2}>Check Invitations</Tab>
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
              <Text mb={4}>Quizzes available:</Text>
              <QuizTable
                quizzes={myQuizzes}
                role={user.role}
                handleViewResults={handleViewResults}
                handleInviteStudents={inviteStudents}
              />
            </Box>
          </Flex>
        </TabPanel>
        <TabPanel>
          <InvitationTable invitations={invitations} role={user.role} /> 
          </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
