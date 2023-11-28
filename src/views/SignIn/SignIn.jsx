import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
    IconButton,
    Box,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { checkIfUserExists, getUser } from "../../services/user.services";
import { loginUser } from "../../services/auth.services";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { setUser } = useAuth();
  const navigate = useNavigate();
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
      await loginUser(dbUser.email, password);
      setUser({ ...dbUser, isLoggedIn: true });
      navigate("/");
    } catch (error) {
      //TODO: show toast message for the error
      alert(error.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
const handleClick = () => setShowPassword(!showPassword);

  return (
    <Box bg="blue.800" height="100vh" width="130vh" padding={4}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.username}>
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
  );
}
