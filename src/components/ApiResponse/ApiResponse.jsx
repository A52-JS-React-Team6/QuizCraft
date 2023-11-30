import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Heading, Flex, Divider, List, ListItem, VStack } from '@chakra-ui/react';

export function ApiResponse() {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        fetch('https://the-trivia-api.com/v2/questions')
            .then(response => response.json())
            .then(data => setQuestions(data));
    }, []);

    const handleAnswerClick = (questionId, answer) => {
        setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    return (
        <Flex width="130vh" as="section" padding={4} flexDirection="column" alignItems="start" backgroundColor="blue.800">
            <Flex justifyContent="space-between" width="100%">
                {/* <Button bg="white">All Quizzes</Button> */}
                <Heading> My Quizzes</Heading>
            </Flex>
            <VStack spacing={6}>
                {questions.map((question, index) => (
                    <Box color="white" key={index} p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" marginBottom={4} width="300px" height="400px">
                        <Heading fontSize="xl">{question.category}</Heading>
                        <Text mt={4}>{question.question.text}</Text>
                        <Divider borderColor="gray.200" my={4} />
                        <List spacing={3}>
                            <ListItem>
                                <Button
                                    colorScheme={selectedAnswers[question.id] === question.correctAnswer ? "green" : "gray"}
                                    onClick={() => handleAnswerClick(question.id, question.correctAnswer)}
                                >
                                    {question.correctAnswer}
                                </Button>
                            </ListItem>
                            {question.incorrectAnswers.map((answer, i) => (
                                <ListItem key={i}>
                                    <Button
                                        colorScheme={selectedAnswers[question.id] === answer ? "red" : "gray"}
                                        onClick={() => handleAnswerClick(question.id, answer)}
                                    >
                                        {answer}
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                ))}
            </VStack>
        </Flex>
    );
}