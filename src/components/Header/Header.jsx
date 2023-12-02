import { Flex, Heading, Image, Avatar, Tooltip, Icon } from "@chakra-ui/react";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PropValidation from "prop-types";

export function Header({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleEditProfileClick = () => navigate("/edit-profile");
  return (
    <Flex bg="blue.800" padding={4}>
      {children}
      <Flex
        as="header"
        width="100%"
        padding={4}
        justifyContent="center"
        alignItems="center"
        color="white"
      >
        <Image
          src={logo}
          alt="Quiz Site Logo"
          boxSize="100px"
          borderRadius="full"
          transform="rotate(-15deg)"
        />
        <Heading as="h1">Lab</Heading>
      </Flex>
      {user?.isLoggedIn &&
        (user?.photo ? (
          <Tooltip label="Edit Profile" aria-label="Edit Profile">
            <Avatar
              size="lg"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  opacity: "0.8",
                },
              }}
              src={user.photo}
              onClick={handleEditProfileClick}
            />
          </Tooltip>
        ) : (
          <Tooltip label="Edit Profile" aria-label="Edit Profile">
            <Avatar
              size="lg"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  opacity: "0.8",
                },
              }}
              onClick={handleEditProfileClick}
            />
          </Tooltip>
        ))}
    </Flex>
  );
}

Header.propTypes = {
  children: PropValidation.node.isRequired,
};
