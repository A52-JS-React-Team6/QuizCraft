import React from 'react';
import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";

export function About() {
   return (
      <Box padding={4}>
        <Heading as="h2" size="lg" marginBottom={4}>About QuizLab</Heading>
        <Text fontSize="md" marginBottom={4}>
          QuizLab is a platform for testing your knowledge across a variety of topics. Our quizzes are fun, interactive, and challenging. Whether you're a trivia novice or a seasoned expert, there's something for everyone on Quiz Site. Happy quizzing!
        </Text>
        <Heading as="h2" size="lg" marginBottom={4}>Meet the team</Heading>
        <SimpleGrid columns={3} spacing={10} marginTop={10}>
          <Box bg="#F1EB90" padding={4} borderRadius="md">
            <Heading size="md" marginBottom={2}>Dima Delcheva</Heading>
            <Text>creator1@example.com</Text>
          </Box>
          <Box bg="#F1EB90" padding={4} borderRadius="md">
            <Heading size="md" marginBottom={2}>Aleksandar Andreev</Heading>
            <Text>creator2@example.com</Text>
          </Box>
          <Box bg="#F1EB90" padding={4} borderRadius="md">
            <Heading size="md" marginBottom={2}>Georgi Ivanov</Heading>
            <Text>georgistoykovivanov@abv.bg</Text>
          </Box>
        </SimpleGrid>
      </Box>
    );
  }