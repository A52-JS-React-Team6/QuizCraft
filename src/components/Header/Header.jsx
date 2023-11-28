import { Flex, Heading, Image, Icon, Avatar } from "@chakra-ui/react";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function Header({children}) {
  const { user } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  const handleEditProfileClick = () => navigate('/edit-profile');
  return (
    <Flex bg="blue.800" padding={4}>
      {children}
      <Flex as="header" width="100%" padding={4} justifyContent="center" alignItems="center"  color="white">
        <Image src={logo} alt="Quiz Site Logo" boxSize="100px" borderRadius="full" transform="rotate(-15deg)" />
        <Heading as="h1">Lab</Heading>
      </Flex>
      {/* {user?.isLoggedIn && <Avatar size="md" onClick={handleEditProfileClick}/>} */}
      {user?.isLoggedIn && user?.photo && <Avatar size="md" src={user?.photo} onClick={handleEditProfileClick}/>}
    </Flex>
  );
}
