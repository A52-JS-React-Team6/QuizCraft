import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { getQuizResult } from "../../services/quizzes.services";
import { Flex, Box, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const ShowScoreModal = ({ quiz, isOpen, onClose }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const results = await getQuizResult(quiz.id);
      setScores(results);
    };
    if (isOpen) {
      fetchScores();
    }
  }, [quiz, isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" h="540px">
      <ModalOverlay />
      <ModalContent bg="blue.800">
        <ModalHeader>Students Scores</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {scores.length > 0 &&
            scores.map((score, index) => (
              <ScoresView key={index} score={score} />
            ))}
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="blue" m={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

ShowScoreModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired,
};

export const ScoresView = ({ score }) => {
  return (
    <Flex
      p={2}
      m={2}
      bg={score.result > 50 ? "green.400" : "red.200"}
      borderRadius="md"
      cursor="pointer"
    >
      <Box>
        <Box>result: {score.result}</Box>
        <Text>username: {score.username}</Text>
      </Box>
    </Flex>
  );
};

ScoresView.propTypes = {
    score: PropTypes.object.isRequired,
};

