import { Box, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box as="footer" bg="blue.800" color="white" width="100%" padding={4}>
      <Text textAlign="center" fontSize="md">
        © {new Date().getFullYear()} QuizLab. All rights reserved.
      </Text>
    </Box>
  );
}