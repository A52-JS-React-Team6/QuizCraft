import {
    Box,
    Button,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react";
  import PropTypes from "prop-types";
  import { userRole } from "../../context/AuthContext";
  import {invitationStatus } from "../../services/quizParticipation.services";

  export const InvitationTable = ({
    invitations,
    role,
    handleAcceptInvitation,
    handleRejectInvitation,
  }) => {

    const acceptInvitation = async (invitation) => {
        handleAcceptInvitation(invitation.quizId,);
    }

    const rejectInvitation = async (invitation) => {
        handleRejectInvitation(invitation.quizId);
    }
  
    return (
      <Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Quiz Title</Th>
              <Th>Teacher</Th>
              <Th>Category</Th>
              <Th>Status</Th>
              {/* <Th>Active Time</Th> */}
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {invitations.length > 0 &&
              invitations.map((invitation, index) => (
                <Tr key={index}>
                    <Td>{invitation.quizTitle}</Td>
                    <Td>{invitation.educator || ''}</Td>
                    <Td>{invitation.quizCategory || ''}</Td>
                    <Td>{invitation.status || ''}</Td>
                  {/* <Td><ActiveTimer activeTime={quiz.activeTime} quizId={quiz.id} /></Td> */}
                  <Td>
                    {role === userRole.STUDENT && 
                        invitation.status === invitationStatus.pending && (
                        <>
                      <Button
                        m={2}
                        colorScheme="blue"
                        onClick={() => acceptInvitation(invitation)}
                      >
                        Accept Invitation
                      </Button>
                      <Button
                      m={2}
                      colorScheme="blue"
                      onClick={() => rejectInvitation(invitation)}
                    >
                      Reject Invitation
                    </Button>
                    </>
                    )}
                    {role === userRole.EDUCATOR && (
                     <Text>Educator</Text>
                    )}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    );
  };
  
  InvitationTable.propTypes = {
    invitations: PropTypes.array.isRequired,
    role: PropTypes.string.isRequired,
    handleAcceptInvitation: PropTypes.func,
    handleRejectInvitation: PropTypes.func,
  };
  