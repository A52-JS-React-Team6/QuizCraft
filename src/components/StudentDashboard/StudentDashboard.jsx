import { Box, Text, Flex, Button, VStack, HStack, Image, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import writing from '../../assets/writing.png';
export const StudentDashboard = () => {

    const myQuizzes = [
        { title: 'Math Quiz For Kids', timeLimit: '15 minutes', category: 'Math', type: 'Open', maxPoints: 10, earnedPoints: '-', status: 'Not Started' },
        { title: 'Science Quiz - Advanced', timeLimit: '30 minutes', category: 'Science', type: 'Invitational', maxPoints: 20, earnedPoints: 15, status: 'Ongoing' },
        { title: 'History Quiz - First World War', timeLimit: '60 minutes', category: 'History', type: 'Invitational', maxPoints: 30, earnedPoints: 24, status: 'Finished' },
        { title: 'Languages - English', timeLimit: '120 minutes', category: 'Languages', type: 'Open', maxPoints: 40, earnedPoints: '-', status: 'Not Started' },
    ];

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

    const quizzes = [
        { name: 'Math Quiz For Kids', subject: 'Math' },
        { name: 'Science Quiz - Advanced', subject: 'Science' },
        { name: 'History Quiz - First World War', subject: 'History' },
        { name: 'Languages - English', subject: 'Languages' },
    ];

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
                    <Text fontSize="2xl" fontWeight="bold">Welcome User!</Text>
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
                    <Text fontSize="lg" fontWeight="bold">Active Quizzes</Text>
                    {quizzes.map((quiz) => (
                        <HStack key={quiz.name} justifyContent="space-between" w="full">
                            <Text>{quiz.name}</Text>
                            <Button colorScheme="blue" size="sm" mr={5} >Join quiz</Button>
                        </HStack>
                    ))}
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
                        <Th color="white">Earned Points</Th>
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
                            <Td>{quiz.earnedPoints}</Td>
                            <Td>{quiz.status}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};