import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { CreateQuestionView } from './CreateQuestionView';
import PropTypes from 'prop-types';

export const CreateQuestionsModal = ({isOpen, onClose, questionIndex }) => {

    const handleQuestionSave = (question) => {
        onClose(question);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent bg='blue.800'>
            <ModalHeader>Create question</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <CreateQuestionView questionIndex={questionIndex} onSaveQuestion={handleQuestionSave} />
            </ModalBody>
          </ModalContent>
        </Modal>
    )
  }

CreateQuestionsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    questionIndex: PropTypes.number.isRequired,
}