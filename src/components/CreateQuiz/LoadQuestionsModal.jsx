import { Button } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useEffect, useState, useCallback } from 'react'
import { QuestionView } from './QuestionView'
import { getQuestions } from '../../services/question.services'
import PropTypes from 'prop-types';

export const LoadQuestionsModal = ({isOpen, onClose, category}) => {
    
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const fetchQuestions = async (category) => {
        const questionsResponse = await getQuestions(category);
        const questionsMap = questionsResponse.map((question) => {
            const {text} = question.question;
            return { text: text, 
                answers: [question.correctAnswer, ...question.incorrectAnswers],
                correctAnswer: question.correctAnswer,
                difficulty: question.difficulty
             }
        })
        setQuestions((prevQuestions) => prevQuestions.concat(questionsMap));
    };

    useEffect(() => {
      setQuestions([]);
        if (category && isOpen) {
            fetchQuestions(category);
        }
    }, [category, isOpen]);


    const handleSelectQuestion = (index) => {
        const newSelectedQuestions = [...selectedQuestions];
        newSelectedQuestions.push(questions[index]);
        setSelectedQuestions(newSelectedQuestions);
    }
    
    const loadMoreQuestions = useCallback(() => {
        fetchQuestions(category);
    }, [category]);

    return (
      <>  
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent bg='blue.800'>
            <ModalHeader>Bank questions</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            {questions.length > 0 && questions.map((question, index) => (
                <QuestionView
                    key={index}
                    question={question}
                    index={index}
                    selected={selectedQuestions.includes(question)}
                    onSelectQuestion={handleSelectQuestion}
                />
            ))}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => onClose(selectedQuestions)}>
                Save
              </Button>
              <Button onClick={loadMoreQuestions} variant='ghost'>Load more...</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

LoadQuestionsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
}
