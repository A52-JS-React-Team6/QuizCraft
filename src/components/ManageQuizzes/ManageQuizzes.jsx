import { Box, Heading, List} from "@chakra-ui/react";
import { QuizItem } from "../../views/Quizitem/Quizitem";

export function ManageQuizzes() {
    
  const quizzes = [
    {
      title: "Math Quiz for Kids",
      category: "Math",
      type: "Open",
      timer: "1 hour",
      maxPoints: 10,
      createdBy: "alex1",
      role: "EDUCATOR",
      createdOn: "2022-01-01",
    },
    {
      title: "Math Quiz for Kids2",
      category: "Math",
      type: "Open",
      timer: "1 hour",
      maxPoints: 10,
      createdBy: "alex1",
      role: "EDUCATOR",
      createdOn: "2022-01-01",
    },
    {
      title: "Math Quiz for Kids3",
      category: "Math",
      type: "Open",
      timer: "1 hour",
      maxPoints: 10,
      createdBy: "alex1",
      role: "EDUCATOR",
      createdOn: "2022-01-01",
    },
  ];

  return (
    <Box p={4}>
      <Heading m={4}>Manage Quizzes</Heading>
      <List spacing={3}>
        {quizzes.map(quiz => (
          <QuizItem key={quiz.title} quiz={quiz} />
        ))}
      </List>
    </Box>
  );

}