
import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

export const StudentsView = ({ student, index, selected, onSelectStudent }) => {    

    return (
        <Box m={3}>
            <Flex m={2} flexDir="column" >
                <Flex>
                    <Text>Student: {student.firstName} {student.lastName}({student.username})</Text>
                    {selected && <CheckIcon m={1} color="green.500" />}
                    <Spacer />
                    <Button color="blue.800" onClick={() => onSelectStudent(index)}>Select Student</Button>
                </Flex>
            </Flex>
        </Box>
    );
}

StudentsView.propTypes = {
    student: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelectStudent: PropTypes.func.isRequired,
}