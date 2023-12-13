import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { userRole } from "../../context/AuthContext";
import { useDisclosure } from "@chakra-ui/react";
import { InviteStudentsModal } from "../EducatorDashboard/InviteStudentsModal";
import { useState } from "react";

export const QuizTable = ({
  quizzes,
  role,
  readyToTake,
  handleJoinQuiz,
  handleTakeQuiz,
  handleInviteStudents,
  handleViewResults,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const closeInviteModal = (students) => {
    handleInviteStudents(selectedQuiz, students);
    onClose();
  };

  const inviteStudents = (quiz) => {
    setSelectedQuiz(quiz);
    onOpen();
  };

  const getQuizStatus = (quiz) => {
    if (quiz.startDate && quiz.endDate) {
      const startDate = new Date(quiz.startDate);
      const endDate = new Date(quiz.endDate);
      const now = new Date();

      if (now < startDate) {
        return "Not started";
      }

      if (now > endDate) {
        return "Finished";
      }

      return "Ongoing";
    }
    return "Open";
  };

  return (
    <Box>
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
            <Th>Status</Th>
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
                <Td>{getQuizStatus(quiz)}</Td>
                {/* <Td><ActiveTimer activeTime={quiz.activeTime} quizId={quiz.id} /></Td> */}
                <Td>
                  {role === userRole.STUDENT && !readyToTake && (
                    <Button
                      colorScheme="blue"
                      onClick={() => handleJoinQuiz(quiz)}
                    >
                      Join
                    </Button>
                  )}
                  {role === userRole.STUDENT && readyToTake && (
                    <Button
                      colorScheme="blue"
                      onClick={() => handleTakeQuiz(quiz)}
                    >
                      Take
                    </Button>
                  )}
                  {role === userRole.EDUCATOR && (
                    <>
                      {getQuizStatus(quiz) === "Finished" && (
                        <Button
                          colorScheme="blue"
                          onClick={() => handleViewResults(quiz)}
                        >
                          View Results
                        </Button>
                      )}
                      {getQuizStatus(quiz) === "Ongoing" && (
                        <Button
                          colorScheme="blue"
                          onClick={() => inviteStudents(quiz)}
                        >
                          Invite Students
                        </Button>
                      )}
                    </>
                  )}
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <InviteStudentsModal
        isOpen={isOpen}
        onClose={closeInviteModal}
        quizId={selectedQuiz}
      />
    </Box>
  );
};

QuizTable.propTypes = {
  quizzes: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  readyToTake: PropTypes.bool,
  handleJoinQuiz: PropTypes.func,
  handleTakeQuiz: PropTypes.func,
  handleInviteStudents: PropTypes.func,
  handleViewResults: PropTypes.func,
};
