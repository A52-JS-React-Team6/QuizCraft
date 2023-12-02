
import { Box, Button, Flex, Spacer, Text, Input } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

export const QuestionView = ({ question, index, selected, onSelectQuestion }) => {    

    return (
        <Box m={3}>
            <Flex m={2}>
                <Text>Question {index + 1}:</Text>
                {selected && <CheckIcon m={1} color="green.500" />}
                <Spacer />
                <Button colorScheme="green" onClick={() => onSelectQuestion(index)}>Select Question</Button>
            </Flex>
            <Input
                value={question.text}
                placeholder="Question"
            />
            <Flex m={2}>
                <Text>Answers:</Text>
                <Spacer />
            </Flex>
            {question.answers.map((answer, answerIndex) => (
                <Flex key={answerIndex} m={2}>
                    <Input
                        value={answer}
                        placeholder="Answer"
                        border={answer === question.correctAnswer ? "2px solid green" : "2px solid red"}
                        readOnly
                    />
                    <Spacer />
                </Flex>
            ))}
        </Box>
    );
}

QuestionView.propTypes = {
    question: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelectQuestion: PropTypes.func.isRequired,
}