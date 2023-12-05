import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue, Text, Image } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import trophy from '../../assets/trophy.png';

export const ScoreBoardView = ({ scores, quizTitle }) => {

  const evenBgColor = useColorModeValue("#007ACC", "rgba(0, 122, 204, 0.1)");
  const imageSrc = trophy;
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Image
          src={imageSrc}
          borderRadius="lg" overflow="hidden"
        />
      </Box>
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Box border="1px solid" borderRadius="lg" borderColor="gray.200" overflow="hidden">
          <Text fontSize="2xl" color="white" textAlign="center" mt={2} mb={2}>{quizTitle}</Text>
          <Text fontSize="2xl" color="white" textAlign="center" mb={4}>ScoreBoard</Text>
          <Table variant="simple" width="auto">
            <Thead>
              <Tr color="white">
                <Th color="white" textAlign="center">Position</Th>
                <Th color="white" textAlign="center">User</Th>
                <Th color="white" textAlign="center">Points</Th>
              </Tr>
            </Thead>
            <Tbody>
              {scores.map((score, index) => (
                <Tr key={index} bgColor={index % 2 === 0 ? evenBgColor : undefined}>
                  <Td textAlign="center" py={2} style={{ paddingLeft: index === 0 ? 0 : '18px' }}>
                    {index === 0 ? (
                      <>
                        <FontAwesomeIcon icon={faTrophy} style={{ color: 'yellow' }} />
                        {index + 1}
                      </>
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
        </Box>
      </Box>
    </>

  );
};