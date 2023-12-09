import { useState, useEffect } from 'react';
import { Box, Button, Text, Heading, Flex, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getQuizById, finishQuiz } from '../../services/quizzes.services';
import { useLocation } from 'react-router-dom';
import { AttemptTimeTimer } from '../AttempTTimeTimer/AttemptTimeTimer';

export const RealQuiz = () => {
    const [quiz, setQuiz] = useState({ questions: [] });
    const location = useLocation();
    const quizId = location.state.quizId;

    useEffect(() => {
        const fetchQuiz = async () => {
            const fetchedQuiz = await getQuizById(quizId);
            setQuiz(fetchedQuiz);
        };

        fetchQuiz();
    }, [quizId]);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const navigate = useNavigate();

    const handleAnswerOptionClick = (answer) => {
        if (!isAnswered) {
            setSelectedAnswer(answer);
            if (answer === quiz.questions[currentQuestion].correctAnswer) {
                setScore(score + 1);
            }
            setIsAnswered(true);
        }
    };

    const handleNextButtonClick = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quiz.questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setShowScore(true);
        }
    };

    const handleFinishButtonClick = async () => {
        const correctAnswers = score;
        const wrongAnswers = quiz.questions.length - score;
        await finishQuiz(quiz.id);
        navigate('/quiz-results', { state: { score, totalQuestions: quiz.questions.length, correctAnswers, wrongAnswers, quizId: quiz.id } });
    };

    return (
        <Flex justifyContent="center" >
            <Box p={4}
                width="2xl"
            >
                <Heading mb="20px" color="white">{quiz.title}</Heading>
                <Flex justifyContent="space-between" width="100%" mb="20px">
                    <Text color="#green">View Progress</Text>
                    <Text>Score: {score}/{quiz.questions.length}</Text>
                </Flex>
                <Flex justifyContent="space-between" width="100%" mb="20px">
                    <Text color="#green">Time Limit</Text>
                    <AttemptTimeTimer quizId={quiz.id}/>
                </Flex>


                <Divider borderColor="whiteOrange" mb="20px" />
                <Box width="100%" mb="20px">
                    {quiz.questions[currentQuestion] && (
                        <Text
                            fontSize="24px"
                            fontWeight="bold"
                            color="whiteOrange"
                        >
                            {quiz.questions[currentQuestion].text}
                        </Text>
                    )}
                </Box>

                <Flex direction="column" width="100%" mb="20px">
                    {quiz.questions[currentQuestion] && quiz.questions[currentQuestion].answers.map((answer, index) => (
                        <Flex
                            as="button"
                            key={index}
                            onClick={() => handleAnswerOptionClick(answer)}
                            bg={selectedAnswer === answer
                                ? answer === quiz.questions[currentQuestion].correctAnswer
                                    ? "#4CAF50"
                                    : "#F44336"
                                : "#EC8F5E"}
                            color="white"
                            m="5px 0"
                            p="20px"
                            borderRadius="20px"
                            alignItems="center"
                            justifyContent="flex-start"
                            width="100%"
                            _hover={{ bg: "whiteOrange" }}
                        >
                            {answer}
                        </Flex>
                    ))}
                </Flex>

                <Divider borderColor="whiteOrange" mb="20px" />

                <Flex justifyContent="space-between" width="100%" mb="20px">
                    <Text color="yellow">{currentQuestion + 1} of {quiz.questions.length} Questions</Text>
                    {selectedAnswer && (
                        <Button
                            bg="#4CAF50"
                            color="white"
                            p="10px 20px"
                            borderRadius="20px"
                            _hover={{ bg: "whiteOrange" }}
                            width="auto"
                            onClick={handleNextButtonClick}
                        >
                            Next
                        </Button>
                    )}
                </Flex>
                {selectedAnswer && (
                    <Text fontStyle="italic" color="yellow">
                        {selectedAnswer === quiz.questions[currentQuestion].correctAnswer
                            ? `Correct Answer: ${selectedAnswer}`
                            : `Incorrect Answer: ${selectedAnswer}`}
                    </Text>
                )}

                {selectedAnswer && selectedAnswer !== quiz.questions[currentQuestion].correctAnswer && (
                    <Text fontStyle="italic" color="yellow">
                        Correct Answer: {quiz.questions[currentQuestion].correctAnswer}
                    </Text>
                )}

                {showScore && (
                    <Button bg='#4CAF50' marginTop={5} marginBot={5} onClick={handleFinishButtonClick}>Finish</Button>
                )}
            </Box>
        </Flex>
    );
};