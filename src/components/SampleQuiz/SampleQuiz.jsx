import { useState } from 'react';
import { Box, Button, Text, Heading, Flex, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const SampleQuiz = () => {
    const questions = [
        { question: 'Who was defeated at the Battle of Little Bighorn?', answers: ['A Treaty of Versailles', 'B Treaty of Yalta', 'C Treaty of Utrecht', 'D Treaty of Geneva'], correct: 'C Treaty of Utrecht' },
        { question: 'Which country hosted the 1970 FIFA World Cup?', answers: ['A Brazil', 'B Chile', 'C Mexico', 'D Sweden'], correct: 'C Mexico' },
        { question: 'Which actor has played roles in films including The Mummy: Tomb of the Dragon Emperor and Mulan?', answers: ['A Jackie Chan', 'B Jet Li', 'C Deng Chao', 'D Stephen Fry'], correct: 'B Jet Li' },
        { question: 'Whose real name is Annie Mae Bullock?', answers: ['A Britney Spears', 'B 4Lady Gaga', 'C Tina Turner', 'D Toni Braxton'], correct: 'C Tina Turner' },
        { question: 'Which of these is a basketball team based in Washington?', answers: ['A Washington Knicks', 'B Washington Wizards', 'C Washington Red Sox', 'D Washington Raiders'], correct: 'B Washington Wizards' },
       ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const navigate = useNavigate();

    const handleAnswerOptionClick = (answer) => {
        if (!isAnswered) {
            setSelectedAnswer(answer);
            if (answer === questions[currentQuestion].correct) {
                setScore(score + 1);
            }
            setIsAnswered(true);
        }
    };

    const handleNextButtonClick = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setShowScore(true);
        }
    };

    const handleFinishButtonClick = () => {
        const correctAnswers = score;
        const wrongAnswers = questions.length - score;
        navigate('/quiz-results', { state: { score, totalQuestions: questions.length, correctAnswers, wrongAnswers } });
    };

    return (
        <Flex justifyContent="center" >
        <Box p={4}
            width="2xl"
        >
            <Heading mb="20px" color="white">Sample Quiz</Heading>
            <Flex justifyContent="space-between" width="100%" mb="20px">
                <Text color="#green">View Progress</Text>
                <Text>Score: {score}/{questions.length}</Text>
            </Flex>
            <Divider borderColor="whiteOrange" mb="20px" />
            <Box width="100%" mb="20px">
                <Text
                    fontSize="24px"
                    fontWeight="bold"
                    color="whiteOrange"
                >
                    {questions[currentQuestion].question}
                </Text>
            </Box>

            <Flex direction="column" width="100%" mb="20px">
                {questions[currentQuestion].answers.map((answer, index) => (
                    <Flex
                        as="button"
                        key={index}
                        onClick={() => handleAnswerOptionClick(answer)}
                        bg={selectedAnswer === answer
                            ? answer === questions[currentQuestion].correct
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
                <Text color="yellow">{currentQuestion + 1} of {questions.length} Questions</Text>
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
                    {selectedAnswer === questions[currentQuestion].correct
                        ? `Correct Answer: ${selectedAnswer}`
                        : `Incorrect Answer: ${selectedAnswer}`}
                </Text>
            )}

            {selectedAnswer && selectedAnswer !== questions[currentQuestion].correct && (
                <Text fontStyle="italic" color="yellow">
                    Correct Answer: {questions[currentQuestion].correct}
                </Text>
            )}

            {showScore && (
                <Button bg='#4CAF50' marginTop={5} marginBot={5} onClick={handleFinishButtonClick}>Finish</Button>
            )}
        </Box>
        </Flex>
    );
};