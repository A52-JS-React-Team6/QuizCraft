import { NavLink } from "react-router-dom";
import "./NavBar.css";
// import { UserSettings } from '../UserSettings/UserSettings';
import { logoutUser } from "../../services/auth.services";
import { useAuth, userRole } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export function NavBarNew() {
  const navigate = useNavigate();
  const toast = useToast();
  const { user, setUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("#007ACC", "rgba(0, 122, 204, 0.1)");

  const onLogout = () => {
    logoutUser();
    setUser({
      isLoggedIn: false,
    });
    toast({
      title: "You have logged out successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/signin");
  };
  return (
    <>
      <IconButton
        colorScheme="teal"
        aria-label="Open Menu"
        size="lg"
        mr={2}
        icon={<HamburgerIcon />}
        onClick={onOpen}
        backgroundColor={bgColor}
        _hover={{ backgroundColor: bgColor }}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent backgroundColor={bgColor}>
            <DrawerCloseButton />
            <DrawerHeader bg={bgColor}>Navigation</DrawerHeader>
            <DrawerBody bg={bgColor}>
              <Flex direction='column' justify='start'>
                <NavLink onClick={onClose} to='/' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Home</NavLink>
                <NavLink to='/about' onClick={onClose} className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>About</NavLink>
                <NavLink to='/sample-quiz' onClick={onClose} className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Take a sample quiz </NavLink>
                <NavLink to='/create-quiz' onClick={onClose} className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Create a Quiz</NavLink>
                {user?.role === userRole.EDUCATOR && (
                  <NavLink to='/manage-quizzes' onClick={onClose} className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Manage Quizzes</NavLink>
                )}
                {user?.isLoggedIn ? (
                  <Flex direction='column' justify='start'>
                    <NavLink to='/api-response' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Api Response </NavLink>
                    <Button onClick={onLogout} className='navigation-link'>Logout</Button>
                    <Box className='logged-as'>
                      Logged as: {user.username} {user.isAdmin && '(Admin)'}
                    </Box>
                  </Flex>
                ) : (
                  <>
                    <NavLink to='/signin' onClick={onClose} className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Sign In</NavLink>
                    <NavLink to='/registration' onClick={onClose} className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Registration</NavLink>
                  </>
                )}

              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>

  );
}
