import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue, Text, Image, Button, Flex } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import trophy from '../../assets/trophy.png';

export const ScoreBoardView = ({ scores, quizTitle, onBack }) => {

  const evenBgColor = useColorModeValue("#007ACC", "rgba(0, 122, 204, 0.1)");
  const imageSrc = trophy;

  return (
    <Flex direction="column" align="center" justify="flex-start" w="100%" pt={10}>
      <Flex direction="row" justify="center" align="start" w="80%" mb={4}>
        <Box flex="1" mr={4} borderWidth={1} borderColor="gray.200" borderRadius="md" overflow="hidden">
          <Text fontSize="2xl" color="white" textAlign="center" mt={2} mb={2}>{quizTitle}</Text>
          <Text fontSize="2xl" color="white" textAlign="center" mb={4}>ScoreBoard</Text>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr color="white">
                <Th color="white" textAlign="center">Position</Th>
                <Th color="white" textAlign="center">User</Th>
                <Th color="white" textAlign="center">Points</Th>
              </Tr>
            </Thead>
            <Tbody>
              {scores.map((score, index) => (
                <Tr key={index} bgColor={index % 2 === 1 ? evenBgColor : undefined}>
                  <Td textAlign="center" py={2}>
                    {index === 0 ? (
                      <Box mr={4}>
                        <FontAwesomeIcon icon={faTrophy} style={{ color: 'yellow' }} />
                        {index + 1}
                      </Box>
                    ) : (
                      index + 1
                    )}
                  </Td>
                  <Td textAlign="center" py={2}>{score.user}</Td>
                  <Td textAlign="center" py={2}>{`${score.points}/10`}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box display="flex" justifyContent="center" mt={4} mb={4}>
            <Button onClick={onBack}>Back</Button>
          </Box>
        </Box>
        <Box flex="1" display="flex" justifyContent="center" alignItems="center" ml={4}>
          <Image
            src={imageSrc}
            borderRadius="lg" overflow="hidden"
            boxSize="350px"
          />
        </Box>
      </Flex>
    </Flex>
  );
};