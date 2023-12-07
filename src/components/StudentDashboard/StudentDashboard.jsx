import { useEffect, useState, useContext } from 'react';
import { Box, Text, Flex, Button, VStack, HStack, Image, Collapse, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import writing from '../../assets/writing.png';
import { joinQuiz, getUserData } from '../../services/user.services';
import { useAuth } from '../../context/AuthContext';
import { getAllQuizzes } from '../../services/quizzes.services';
import { useNavigate } from 'react-router-dom'
import { getUserQuizResults } from '../../services/quizzes.services';


export const StudentDashboard = () => {

    const navigate = useNavigate();
    const { user } = useAuth();
    const [quizzes, setQuizzes] = useState([]);
    const [myQuizzes, setMyQuizzes] = useState([]);
    const [showQuizzes, setShowQuizzes] = useState(false);
    const [quizResults, setQuizResults] = useState({});

    useEffect(() => {
        const fetchQuizzes = async () => {
            const allQuizzes = await getAllQuizzes();
            const userData = await getUserData(user.username);
            const joinedQuizIds = userData.joinedQuizzes ? userData.joinedQuizzes.map(quiz => quiz.id) : [];
            const publicQuizzes = allQuizzes.filter(quiz => quiz.type === 'Open' && !joinedQuizIds.includes(quiz.id));
            setQuizzes(publicQuizzes);
            setMyQuizzes(userData.joinedQuizzes || []);
        };

        fetchQuizzes();
    }, []);

    useEffect(() => {
        const fetchQuizResults = async () => {
            const results = await getUserQuizResults(user.username);
            setQuizResults(results);
        };

        fetchQuizResults();
    }, [user.username]);


    const handleJoinQuiz = async (quiz) => {
        await joinQuiz(user.username, quiz);
        const userData = await getUserData(user.username);
        setMyQuizzes(userData.joinedQuizzes);
        setQuizzes(prevQuizzes => prevQuizzes.filter(q => q.id !== quiz.id));
    };

    const timeSpent = {
        Math: 20,
        Science: 60,
        History: 45,
        Languages: 30,
    };

    const imageSrc = writing;

    const totalTime = Object.values(timeSpent).reduce((acc, time) => acc + time, 0);
    const radius = 16;
    const circumference = radius * 2 * Math.PI;

    let cumulativeOffset = 0;



    const categoryColors = {
        Math: '#FFA500',
        Science: '#0000FF',
        History: '#FF0000',
        Languages: '#008000',
    };

    return (
        <Box p="4">
            <Flex justifyContent="space-between" alignItems="center">
                <VStack align="center" w="full" pr="6">
                    <Text fontSize="2xl" fontWeight="bold">Welcome {user.username}!</Text>
                    <Text>You have completed 5 quizzes. Take your time and continue learning and upgrading your knowledge by attending more quizzes!</Text>
                </VStack>
                <Image
                    src={imageSrc}
                    boxSize="150px"
                    objectFit="cover"
                    m="4"
                    alignSelf="flex-start"
                    marginTop="-17px"
                    borderRadius="25px"
                />
            </Flex>
            <Flex mt="10" justifyContent="space-between">
                <VStack w="50%">
                    <Text fontSize="lg" fontWeight="bold" mb="2">Time spent on Quizzes</Text>
                    <Box position="relative" width="200px" height="200px">
                        <svg width="200" height="200" viewBox="0 0 40 40">
                            {Object.entries(timeSpent).map(([subject, time], index) => {
                                const percentage = time / totalTime;
                                const strokeDasharray = `${percentage * circumference} ${circumference}`;
                                const strokeDashoffset = -cumulativeOffset;
                                cumulativeOffset += percentage * circumference;
                                return (
                                    <circle
                                        key={subject}
                                        cx="20"
                                        cy="20"
                                        r={radius}
                                        fill="transparent"
                                        stroke={categoryColors[subject]}
                                        strokeWidth="2.5"
                                        strokeDasharray={strokeDasharray}
                                        strokeDashoffset={strokeDashoffset}
                                        transform="rotate(-90 20 20)"
                                    />
                                );
                            })}
                        </svg>
                    </Box>
                    <HStack justify="space-around" w="full" pt="4">
                        {Object.entries(timeSpent).map(([subject, time]) => (
                            <VStack key={subject}>
                                <Text color={categoryColors[subject]}>{subject}</Text>
                                <Text fontSize="sm">{`${time} min`}</Text>
                            </VStack>
                        ))}
                    </HStack>
                </VStack>
                <VStack w="50%">
                    <Flex w="full" justifyContent="space-between">
                        <Button colorScheme="green">
                            Check invitations
                        </Button>
                        <Button colorScheme="green" onClick={() => setShowQuizzes(!showQuizzes)}>
                            Check all public quizzes
                        </Button>
                    </Flex>
                    <Collapse in={showQuizzes}>
                        <Box className="active-quizzes-list" ml={300}>
                            {quizzes.map((quiz) => (
                                <HStack key={quiz.title} justifyContent="space-between" w="full">
                                    <Text>{quiz.title}</Text>
                                    <Button colorScheme="blue" size="sm" mr={5} onClick={() => handleJoinQuiz(quiz)}>Join quiz</Button>
                                </HStack>
                            ))}
                        </Box>
                    </Collapse>
                </VStack>
            </Flex>
            <Text fontSize="lg" fontWeight="bold" mt="10">My Quizzes</Text>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th color="white">Title</Th>
                        <Th color="white">Time Limit</Th>
                        <Th color="white">Category</Th>
                        <Th color="white">Type</Th>
                        <Th color="white">Max Points</Th>
                        <Th color="white">Earned Points </Th>
                        <Th color="white">Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {myQuizzes.map((quiz, index) => (
                        <Tr key={index}>
                            <Td>{quiz.title}</Td>
                            <Td>{quiz.timeLimit}</Td>
                            <Td><Text color={categoryColors[quiz.category]}>{quiz.category}</Text></Td>
                            <Td>{quiz.type}</Td>
                            <Td>{quiz.maxPoints}</Td>
                            <Td>{quizResults[quiz.id]?.result || 'No result'}</Td>
                            <Td>{quiz.status}</Td>
                            <Td>
                                {!quizResults[quiz.id] &&
                                    <Button colorScheme="green" onClick={() => navigate('/real-quiz', { state: { quizId: quiz.id } })}>
                                        Start the Quiz
                                    </Button>
                                }
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};