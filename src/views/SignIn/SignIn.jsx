import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  Heading,
  useToast
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { checkIfUserExists, getUser } from "../../services/user.services";
import { loginUser } from "../../services/auth.services";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getPicture } from "../../services/storage.services";

export function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const onSubmit = async (values) => {
    const check = await checkIfUserExists(values.username);
    if (!check) {
      //TODO: show toast message a user does not exist
      alert("User does not exist");
      return;
    }
    try {
      const { username, password } = values;
      const dbUser = await getUser(username);

      if (dbUser.isBanned) {
        toast({ 
          position: "bottom",
          title: "You are banned.", 
          status: "error", 
          duration: 3000, 
          isClosable: true });
        return;
      }

      await loginUser(dbUser.email, password);
      let photoUrl = "";
      if (dbUser.photoName) {
        photoUrl = await getPicture(dbUser.username, dbUser.photoName);
      }

      setUser({ ...dbUser, isLoggedIn: true, photo: photoUrl });
      toast({
        title: "Sign in successful.",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      navigate("/");
    } catch (error) {
      //TODO: show toast message for the error
      alert(error.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  return (
    <Flex justifyContent="center">
      <Box p={4}>
        <Heading m={4}>Sign In</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={3} isInvalid={errors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              {...register("username", { required: "This is required" })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: "This is required" })}
              />
              <InputRightElement width="4.5rem">
                <IconButton h="1.75rem" size="sm" onClick={handleClick}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </IconButton>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Button m={4} color="blue.800" type="submit">
            Sign In
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
