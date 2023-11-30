import { useState } from 'react';
import { Box, Button, Spacer, FormControl, FormLabel, Input, Select, Checkbox, Stack, Textarea, IconButton, CloseButton, FormErrorMessage, Flex, Heading } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuth } from '../../context/AuthContext';
import { createQuiz } from '../../services/quizzes.services';


export const CreateQuiz = () => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [timer, setTimer] = useState(false);
    const [questions, setQuestions] = useState([{ text: '', answers: [''] }]);
    const [titleError, setTitleError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // if (user.isEducator) {
        try {
            await createQuiz(title, category, type, user.username, questions, timer);

        } catch (error) {
            console.error('Failed to create quiz:', error);
        }

        setTitle('');
        setCategory('');
        setType('');
        setTimer(false);
        setQuestions([{ text: '', answers: [''] }]);
        // }

    };

    const handleQuestionChange = (index, text) => {
        const newQuestions = [...questions];
        newQuestions[index].text = text;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (questionIndex, answerIndex, text) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers[answerIndex] = text;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { text: '', answers: [''] }]);
    };

    const addAnswer = (index) => {
        const newQuestions = [...questions];
        newQuestions[index].answers.push('');
        setQuestions(newQuestions);
    };

    const removeQuestion = (index) => {
        setQuestions(questions.filter((_, questionIndex) => questionIndex !== index));
    };

    const removeAnswer = (questionIndex, answerIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers = newQuestions[questionIndex].answers.filter((_, index) => index !== answerIndex);
        setQuestions(newQuestions);
    };

    return (
        <Flex justifyContent="center">
            <Box as="form" w="2xl" p="6" onSubmit={handleSubmit}>
                <Heading m={4}>Create Quiz</Heading>
                <Stack spacing="6">
                    <FormControl id="title" isInvalid={!!titleError}>
                        <FormLabel>Title</FormLabel>
                        <Input
                            value={title}
                            onChange={(e) => {
                                const value = e.target.value;
                                setTitle(value);
                                if (value.length < 3 || value.length > 30) {
                                    setTitleError('Title must be between 3 and 30 characters');
                                } else {
                                    setTitleError('');
                                }
                            }}
                        />
                        <FormErrorMessage>{titleError}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="category">
                        <FormLabel>Category</FormLabel>
                        <Input value={category} onChange={(e) => setCategory(e.target.value)} />
                    </FormControl>

                    <FormControl id="type">
                        <FormLabel>Type</FormLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="open">Open</option>
                            <option value="invitational">Invitational</option>
                        </Select>
                    </FormControl>

                    <FormControl id="timer">
                        <Flex align="center">
                            <FormLabel mb="0">Timer</FormLabel>
                            <Spacer />
                            <Checkbox isChecked={timer} onChange={(e) => setTimer(e.target.checked)}>Include a timer</Checkbox>
                        </Flex>
                    </FormControl>

                    {questions.map((question, questionIndex) => (
                        <Box key={questionIndex}>
                            <FormControl id={`question-${questionIndex}`}>
                                <FormLabel>Question {questionIndex + 1}</FormLabel>
                                <Textarea value={question.text} onChange={(e) => handleQuestionChange(questionIndex, e.target.value)} />
                            </FormControl>
                            {question.answers.map((answer, answerIndex) => (
                                <Flex align="center" key={answerIndex}>
                                    <FormControl id={`question-${questionIndex}-answer-${answerIndex}`} mr={2}>
                                        <FormLabel>Answer {answerIndex + 1}</FormLabel>
                                        <Input value={answer} onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)} />
                                    </FormControl>
                                    <Spacer />
                                    <IconButton mt={8} aria-label="Remove answer" icon={<CloseIcon />} onClick={() => removeAnswer(questionIndex, answerIndex)} />
                                </Flex>
                            ))}

                            <Button color='blue.800' mt={5} mr={2} onClick={() => addAnswer(questionIndex)} leftIcon={<AddIcon />}>Add Answer</Button>
                            <IconButton color='blue.800' mt={5} aria-label="Remove question" icon={<CloseIcon />} onClick={() => removeQuestion(questionIndex)} />
                        </Box>
                    ))}

                    <Button color='blue.800' onClick={addQuestion} leftIcon={<AddIcon />}>Add Question</Button>

                    <Button color='blue.800' type="submit" onClick={handleSubmit}>Finish</Button>
                </Stack>
            </Box>
        </Flex>
    );
};