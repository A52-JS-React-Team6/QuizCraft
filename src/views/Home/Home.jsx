import React from 'react';
import { Flex, Box, Heading, Button, Text, Image } from "@chakra-ui/react";
import rubik_cube from '../../assets/rubik_cube.gif';
import { Link } from 'react-router-dom';



export function Home() {
  return (
    <Flex justifyContent="space-between" alignItems="center" height="100vh">
      <Box align="center" width="50%" padding={4} bg="#EC8F5E" borderRadius="md" boxShadow="md">
        <Heading marginBottom={6} textAlign="center">Welcome to Quiz Lab</Heading>
        <Text fontSize="xl" marginBottom={10}>
          Test your knowledge with our fun and interactive quizzes. Click the button below to get started.
        </Text>
        <Link to="/sampleQuiz">
          <Button bg="blue.800" color="white" size="lg" width="100%" _hover={{}}>
            Start Quiz
          </Button>
        </Link>
      </Box>
      <Image src={rubik_cube} alt="Rubik's Cube" boxSize="500px" objectFit="cover" />
    </Flex>
  );
}