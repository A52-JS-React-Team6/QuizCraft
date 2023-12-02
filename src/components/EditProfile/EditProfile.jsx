import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormErrorMessage,
  InputRightElement,
  useToast,
  Box,
  InputLeftAddon,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { checkIfUserExists, updateUser } from "../../services/user.services";
// import { registerUser } from "../../services/auth.services";
import { uploadPicture } from "../../services/storage.services"
import { useAuth } from "../../context/AuthContext";

export const EditProfile = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const { user, setUser } = useAuth();
  
  const photoFile = watch('photo', [{name: user?.photoName}]);
  const toast = useToast();
  const onSubmit = async (values) => {
    const check = await checkIfUserExists(user?.username)
    if(!check) {
        // TODO: show toast message if username already exists
        alert('User does not exists');
        return;
    }
    try {
        if(values.photo.length > 0 && values.photo[0].name) {
            const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
            if(!allowedExtensions.exec(values.photo[0].name)) {
                alert('Invalid file type');
                return;
            }
        }
        const dbUser = await updateUser({...values, uid: user.uid, username: user.username, photoName: values.photo.length > 0 ? values.photo[0].name : '', address: values.address || '' });
        if (values.photo.length > 0 && values.photo[0].name) {
            const uploadResponseUrl = await uploadPicture(dbUser.username, values.photo[0]);
            setUser({...dbUser, isLoggedIn: true, photo: uploadResponseUrl });
        } else {
            setUser({...dbUser, isLoggedIn: true});
        }
        toast({
            title: "Profile updated successfully.",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    } catch (error) {
        //TODO: show toast message for the error
        alert(error.message);
    }
  };

  return (
    <Box p={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
            id="username"
            defaultValue={user.username}
            readOnly
            />
            <FormErrorMessage>
            {errors.username && errors.username.message}
            </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.firstName}>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
            id="firstName"
            defaultValue={user.firstName}
            isRequired
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
            defaultValue={user.lastName}
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

        <FormControl optionalIndicator isInvalid={errors.phone}>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <InputGroup>
                
                <InputLeftAddon color="blue.500">  +359
                    <PhoneIcon color='blue.500' m={2}/>
                </InputLeftAddon>   
                <Input id="phone" defaultValue={user.phone} {...register("phone", {
                // required: "This is required",
                minLength: { value: 10, message: "Phone number should be 10 digits" },
                maxLength: { value: 10, message: "Phone number should be 10 digits" },
                pattern: { value: /^[0-9]+$/i, message: "Only digits are allowed" }
                })} />
                <FormErrorMessage>
                {errors.phone && errors.phone.message}
                </FormErrorMessage>
            </InputGroup>
        </FormControl>

        <FormControl isInvalid={errors.address}>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
            id="address"
            defaultValue={user.address || ''}
            {...register("address", {
                required: "This is required",
                minLength: { value: 1, message: "Minimum length should be 1" },
                maxLength: { value: 30, message: "Maximum length should be 30" },
            })}
            />
            <FormErrorMessage>
            {errors.address && errors.address.message}
            </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
            id="email"
            defaultValue={user.email}
            readOnly
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

        <FormControl isInvalid={errors.photo}>
            <FormLabel htmlFor="photo">Photo</FormLabel>
            <InputGroup>
            <Input value={photoFile && photoFile[0] ? photoFile[0].name : ''} placeholder="Upload a photo .jpg, .jpeg, .png .gif" readOnly />
                <InputRightElement width="auto">
                    <Input type="file" id="photo" {...register("photo")} hidden accept=".jpg, .jpeg, .png .gif"/>
                    <Button onClick={() => document.getElementById('photo').click()}>Upload</Button>
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
            {errors.photo && errors.photo.message}
            </FormErrorMessage>
        </FormControl>

        {/* <FormControl isInvalid={errors.role}>
            <FormLabel htmlFor="role">Role</FormLabel>
            <Select
            id="role"
            defaultValue={user.role}
            {...register("role", { required: "This is required" })}
            >
            <option value="STUDENT">Student</option>
            <option value="EDUCATOR">Educator</option>
            </Select>
            <FormErrorMessage>
            {errors.role && errors.role.message}
            </FormErrorMessage>
        </FormControl> */}

        {/* <FormControl isInvalid={errors.password}>
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
        </FormControl> */}

        <Button m={4} colorScheme="teal" type="submit">
            Save Changes
        </Button>
        <Box>{user.username}</Box>
        </form>
    </Box>
  );
};
