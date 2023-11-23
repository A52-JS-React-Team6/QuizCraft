import React from 'react';
import { Flex, Box, Heading, Button, Text, Center } from "@chakra-ui/react";

export function Home () {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh" width="100vw" bg="gray.200">
      <Box  align="center" w="50%" p={4} bg="white" borderRadius="md" boxShadow="md">
        <Heading mb={6} textAlign="center">Welcome to Quiz Site</Heading>
        <Text fontSize="xl" mb={10}>
          Test your knowledge with our fun and interactive quizzes. Click the button below to get started.
        </Text>
        <Button colorScheme="teal" size="lg" w="100%">
          Start Quiz
        </Button>
      </Box>
      </Flex>
  );
}