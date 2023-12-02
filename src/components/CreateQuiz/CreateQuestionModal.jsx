import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { CreateQuestionView } from './CreateQuestionView'
export const CreateQuestionsModal = ({isOpen, onClose, questionIndex }) => {

    const handleQuestionSave = (question) => {
        onClose(question);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg='blue.800'>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <CreateQuestionView questionIndex={questionIndex} onSaveQuestion={handleQuestionSave} />
            </ModalBody>
          </ModalContent>
        </Modal>
    )
  }