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
  useToast
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { userRole } from "../../context/AuthContext";
import { useDisclosure } from "@chakra-ui/react";
import { InviteStudentsModal } from "../EducatorDashboard/InviteStudentsModal";
import { useState } from "react";
import { participationStatus } from "../../services/quizParticipation.services";
import { ShowScoreModal } from "../EducatorDashboard/ShowScoreModal";

export const QuizTable = ({
  quizzes,
  role,
  readyToTake,
  showScore,
  handleJoinQuiz,
  handleTakeQuiz,
  handleInviteStudents,
  handleViewResults,
}) => {

  const { isOpen: isInviteStudentOpen, onOpen: onInviteStudentOpen, onClose: onInviteStudentClose } = useDisclosure();
  const { isOpen: isShowScoreOpen, onOpen: onShowScoreOpen, onClose: onShowScoreClose } = useDisclosure();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const toast = useToast();

  const closeInviteModal = (students) => {
    handleInviteStudents(selectedQuiz, students);
    onInviteStudentClose();
  };

  const inviteStudents = (quiz) => {
    setSelectedQuiz(quiz);
    onInviteStudentOpen();
  };

  const showStudentsScore = (quiz) => {
    setSelectedQuiz(quiz);
    onShowScoreOpen();
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

  const calculateScore = (quiz) => {
    if (quiz.score) {
        return `${
            Math.round((quiz.score / quiz.totalPoints) * 100 * 100) / 100
        }%`;
    }
    return `N/A`;
  }

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            {/* <Th>Timer</Th> */}
            <Th>Category</Th>
            <Th>Type</Th>
            <Th>Total Points</Th>
            {showScore && <>
                <Th>Your Score</Th>
                <Th>Participation Status</Th>
            </>}
            <Th>Quiz Status</Th>
            {/* <Th>Active Time</Th> */}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {quizzes.length > 0 &&
            quizzes.map((quiz, index) => (
              <Tr key={index}>
                <Td>{quiz.title}</Td>
                {/* <Td>{quiz.timerDuration || ""}</Td> */}
                <Td>
                  <Text>{quiz.category}</Text>
                </Td>
                <Td>{quiz.type}</Td>
                <Td>{quiz.totalPoints || ""}</Td>
              
                { showScore && <>
                    <Td>{calculateScore(quiz)}</Td>
                    <Td>{quiz.participationStatus || ""}</Td>
                </>}
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
                  {role === userRole.STUDENT && readyToTake && 
                  quiz.participationStatus !== participationStatus.finished && (
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
                          onClick={() => showStudentsScore(quiz)}
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
      {selectedQuiz && (
        <InviteStudentsModal
          isOpen={isInviteStudentOpen}
          onClose={closeInviteModal}
          quiz={selectedQuiz}
        />
      )}
      {selectedQuiz && (
        <ShowScoreModal
          isOpen={isShowScoreOpen}
          onClose={onShowScoreClose}
          quiz={selectedQuiz}
        />
      )}
    </Box>
  );
};

QuizTable.propTypes = {
  quizzes: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  readyToTake: PropTypes.bool,
  showScore: PropTypes.bool,
  handleJoinQuiz: PropTypes.func,
  handleTakeQuiz: PropTypes.func,
  handleInviteStudents: PropTypes.func,
  handleViewResults: PropTypes.func,
};
