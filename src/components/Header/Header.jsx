import { Flex, Heading, Image, Spacer } from "@chakra-ui/react";
import logo from "../../assets/logo.jpg";

export function Header() {
  return (
    <Flex as="header" width="100%" padding={4} justifyContent="center" alignItems="center" bg="blue.800" color="white">
      <Image src={logo} alt="Quiz Site Logo" boxSize="100px" borderRadius="full" transform="rotate(-15deg)" />
      <Spacer />
      <Heading as="h1">QuizLab</Heading>
      <Spacer />
    </Flex>
  );
}