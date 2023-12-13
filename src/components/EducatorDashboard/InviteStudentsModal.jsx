import { Button, Flex } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getStudents } from '../../services/user.services';
import { StudentsView } from './StudentsView';
import PropTypes from 'prop-types';

export const InviteStudentsModal = ({isOpen, onClose, quiz }) => {
    
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetchStudents();
        }
    }, [isOpen, quiz]);

    const fetchStudents = async () => {
        const students = await getStudents();
        setStudents(prevStudents => prevStudents.concat(students));
    }

    const handleSelectStudents = (index) => {
        const newSelectedStudents = [...selectedStudents];
        newSelectedStudents.push(students[index]);
        setSelectedStudents(newSelectedStudents);
    }

    return (
      <>  
        <Modal isOpen={isOpen} onClose={onClose} size="xl" h="540px">
          <ModalOverlay />
          <ModalContent bg='blue.800'>
            <ModalHeader>Invite Students</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            {students.length > 0 && students.map((student, index) => (
                <StudentsView 
                    key={index}
                    student={student}
                    index={index}
                    selected={selectedStudents.includes(student)}
                    onSelectStudent={handleSelectStudents}
                />
            ))}
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Button colorScheme='blue' m={3} onClick={() => onClose(selectedStudents)}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

InviteStudentsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    quiz: PropTypes.object.isRequired,
}
