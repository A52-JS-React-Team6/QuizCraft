import React from 'react';
import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, useColorModeValue, Text } from '@chakra-ui/react';
import { ScoreBoardView } from '../../views/ScoreBoard/ScoreBoardView';
import { db } from '../../config/firebase-config';
import { onValue, ref } from 'firebase/database';

export const StudentScoreBoard = () => {

    const [quizzes, setQuizzes] = useState([]);
    const [showScoreBoard, setShowScoreBoard] = useState(null);

    const evenBgColor = useColorModeValue("#007ACC", "rgba(0, 122, 204, 0.1)");

    const scores = [
        { user: 'ivan', points: 10 },
        { user: 'petko', points: 9 },
    ];

    useEffect(() => {
        const quizzesRef = ref(db, 'quizzes');
        onValue(quizzesRef, (snapshot) => {
            const data = snapshot.val();
            const quizzesArray = [];
            for (let id in data) {
                quizzesArray.push({
                    title: data[id].title,
                    category: data[id].category,
                    type: data[id].type,
                    maxPoints: data[id].maxPoints,
                    earnedPoints: '-',
                    passingScore: 6,
                    status: 'Finished',
                });
            }
            setQuizzes(quizzesArray);
        });
    }, []);

    const handleViewScoreBoard = (index) => {
        setShowScoreBoard(quizzes[index]);
    };

    const handleBack = () => {
        setShowScoreBoard(null);
    };

    return (
        <>
            {showScoreBoard ? (
                <ScoreBoardView scores={scores} quizTitle={showScoreBoard.title} onBack={handleBack} />
            ) : (
                <>
                    <Text fontSize="2xl" color="white" textAlign="center" mt={4} mb={4}>All Quizzes</Text>
                    <Table variant="simple" mt={4} mb={4}>
                        <Thead>
                            <Tr>
                                <Th color="white" textAlign="center">Title</Th>
                                <Th color="white" textAlign="center">Category</Th>
                                <Th color="white" textAlign="center">Type</Th>
                                <Th color="white" textAlign="center">Max Points</Th>
                                <Th color="white" textAlign="center">Earned Points</Th>
                                <Th color="white" textAlign="center">Passing Score</Th>
                                <Th color="white" textAlign="center">Status</Th>
                                <Th color="white" textAlign="center">View ScoreBoard</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {quizzes.map((quiz, index) => (
                                <Tr key={index} bgColor={index % 2 === 1 ? evenBgColor : undefined}>
                                    <Td textAlign="center">{quiz.title}</Td>
                                    <Td textAlign="center">{quiz.category}</Td>
                                    <Td textAlign="center">{quiz.type}</Td>
                                    <Td textAlign="center">{quiz.maxPoints}</Td>
                                    <Td textAlign="center">{quiz.earnedPoints}</Td>
                                    <Td textAlign="center">{quiz.passingScore}</Td>
                                    <Td textAlign="center">{quiz.status}</Td>
                                    <Td textAlign="center">
                                        <Button onClick={() => handleViewScoreBoard(index)}>
                                            View Score Board
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </>
            )}
        </>
    );
};

