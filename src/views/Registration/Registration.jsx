import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Box,
} from "@chakra-ui/react";
import { checkIfUserExists, createUser } from "../../services/user.services";
import { registerUser } from "../../services/auth.services";
import { useAuth } from "../../context/AuthContext";

export const Registration = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();
  const defaultAuthUser = {
    username: "",
    firstName: "",
    lastName: "",
    role: "STUDENT",
    email: "",
  };

  const { user, setUser } = useAuth();
  const onSubmit = async (values) => {
    const check = await checkIfUserExists(values.username)
    if(check) {
        // TODO: show toast message if username already exists
        alert('User already exists');
        return;
    }
    try {
        const {email, password } = values;
        const credentials = await registerUser(email, password);
        const { uid } = credentials.user;
        const dbUser = await createUser({...values, uid});
        setUser({...dbUser, isLoggedIn: true});
        //TODO: redirect to home page
        //TODO: show toast message

    } catch (error) {
        //TODO: show toast message for the error
        alert(error.message);
    }
  };

  return (
    <Box bg="blue.800" height="100vh" width="130vh" padding={4}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.username}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          defaultValue={defaultAuthUser.username}
          {...register("username", {
            required: "This is required",
            minLength: { value: 3, message: "Minimum length should be 3" },
            maxLength: { value: 30, message: "Maximum length should be 30" },
          })}
        />
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.firstName}>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input
          id="firstName"
          defaultValue={defaultAuthUser.firstName}
          {...register("firstName", {
            required: "This is required",
            minLength: { value: 1, message: "Minimum length should be 1" },
            maxLength: { value: 30, message: "Maximum length should be 30" },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Only letters are allowed",
            },
          })}
        />
        <FormErrorMessage>
          {errors.firstName && errors.firstName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.lastName}>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input
          id="lastName"
          defaultValue={defaultAuthUser.lastName}
          {...register("lastName", {
            required: "This is required",
            minLength: { value: 1, message: "Minimum length should be 1" },
            maxLength: { value: 30, message: "Maximum length should be 30" },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Only letters are allowed",
            },
          })}
        />
        <FormErrorMessage>
          {errors.lastName && errors.lastName.message}
        </FormErrorMessage>
      </FormControl>

      {/* <FormControl isInvalid={errors.phone}>
        <FormLabel htmlFor="phone">Phone</FormLabel>
        <Input id="phone" defaultValue={defaultAuthUser.phone} {...register("phone", {
          required: "This is required",
          minLength: { value: 10, message: "Phone number should be 10 digits" },
          maxLength: { value: 10, message: "Phone number should be 10 digits" },
          pattern: { value: /^[0-9]+$/i, message: "Only digits are allowed" }
        })} />
        <FormErrorMessage>
          {errors.phone && errors.phone.message}
        </FormErrorMessage>
      </FormControl> */}

      <FormControl isInvalid={errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          defaultValue={defaultAuthUser.email}
          {...register("email", {
            required: "This is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      {/* <FormControl isInvalid={errors.photo}>
        <FormLabel htmlFor="photo">Photo</FormLabel>
        <InputGroup>
          <Input id="photo" defaultValue={photoFile ? photoFile[0].name : ''} placeholder="Upload a photo" readOnly />
          <InputRightElement width="auto">
            <Input type="file" id="photo" {...register("photo")} hidden />
            <Button onClick={() => document.getElementById('photo').click()}>Upload</Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors.photo && errors.photo.message}
        </FormErrorMessage>
      </FormControl> */}

      <FormControl isInvalid={errors.role}>
        <FormLabel htmlFor="role">Role</FormLabel>
        <Select
          id="role"
          defaultValue={defaultAuthUser.role}
          {...register("role", { required: "This is required" })}
        >
          <option value="STUDENT">Student</option>
          <option value="EDUCATOR">Educator</option>
        </Select>
        <FormErrorMessage>
          {errors.role && errors.role.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: "This is required",
            minLength: { value: 6, message: "Minimum length should be 6" },
            maxLength: { value: 30, message: "Maximum length should be 30" },
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.confirmPassword}>
        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "This is required",
            validate: (value) =>
              value === getValues().password || "The passwords do not match",
          })}
        />
        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>

      <Button m={4} color="blue.800" type="submit">
        Register
      </Button>
      <Box>{user.username}</Box>
    </form>
    </Box>
  );
};
