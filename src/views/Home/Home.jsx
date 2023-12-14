import { Flex, Box, Heading, Button, Text, Image, VStack } from "@chakra-ui/react";
import rubik_cube from '../../assets/rubik_cube.gif';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export function Home() {
  
   const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/sample-quiz');
  };
  
  return (
    <Flex direction="column" align="center" justify="center" height="100vh" bg="blue.800" p={4}>
      <VStack spacing={6} align="center" bg="#EC8F5E" p={6} borderRadius="md" boxShadow="md">
        <Heading as="h1" size="2xl">Welcome to Quiz Lab</Heading>
        <Text fontSize="xl" textAlign="center">
          Test your knowledge with our fun and interactive quizzes. Click the button below to get started.
        </Text>
        <Link to="/sample-quiz">
          <Button bg="blue.800" color="white" size="lg" width="100%">
            Start a quiz
          </Button>
        </Link>
      </VStack>
      <Box mt={6}>
        <Image src={rubik_cube} alt="Rubik's Cube" boxSize="450px" objectFit="cover" />
      </Box>
    </Flex>
  );
}