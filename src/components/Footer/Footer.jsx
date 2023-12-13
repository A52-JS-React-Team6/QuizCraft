import { Box, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <Box as="footer" bg="blue.800" color="white" width="100%" padding={4}>
      <NavLink  to='/about' textAlign="center" fontSize="md">
        © {new Date().getFullYear()} QuizLab. All rights reserved.
      </NavLink>
    </Box>
  );
}