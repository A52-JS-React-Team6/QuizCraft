const QUESTION_API_URL = 'https://the-trivia-api.com/v2/questions'
export const getQuestions = async (category) => {
    const response = await fetch(`${QUESTION_API_URL}/?categories=${category.toLowerCase()}`);
    const data = await response.json();
    return data;
}


