import { Flex, Button, Heading } from "@chakra-ui/react";

export function StudentDashboard() {
    return (
        <Flex as="section" width="100%" padding={4} justifyContent="space-between" alignItems="center">
            <Button colorScheme="teal">All Quizzes</Button>
            <Heading> My Quizzes</Heading>
        </Flex>
    );
}