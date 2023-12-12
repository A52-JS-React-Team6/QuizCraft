const QUESTION_API_URL = 'https://the-trivia-api.com/v2/questions'
export const getQuestions = async (category) => {
    const response = await fetch(`${QUESTION_API_URL}/?categories=${category.toLowerCase()}&limit=5`);
    const data = await response.json();
    return data;
}

export const QuestionDifficulty = {
    easy: 1,
    medium: 3,
    hard: 5
}
