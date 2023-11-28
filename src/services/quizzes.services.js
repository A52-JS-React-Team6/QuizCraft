import { ref, push, get, update, remove } from 'firebase/database';
import { db } from '../config/firebase-config';

const fromQuizDocument = snapshot => {
    const quizDocument = snapshot.val();

    return Object.keys(quizDocument).map(key => {
        const quiz = quizDocument[key];

        return {
            ...quiz,
            id: key,
        };
    });
}

export const createQuiz = async (title, category, type, username, timer) => {
    const result = await push(
        ref(db, 'quizzes'),
        {
            title,
            category,
            type,
            author: username,
            timer,
            createdOn: Date.now(),
        },
    );

    return getQuizById(result.key);
};

export const getQuizById = async (id) => {
    const result = await get(ref(db, `quizzes/${id}`));

    if (!result.exists()) {
        throw new Error(`Quiz with id ${id} does not exist!`);
    }

    const quiz = result.val();
    quiz.id = id;
    quiz.createdOn = new Date(quiz.createdOn);

    return quiz;
};

export const getAllQuizzes = async () => {
    const result = await get(ref(db, 'quizzes'));

    if (!result.exists()) {
        return [];
    }

    return fromQuizDocument(result);
};      

export const getQuizzesByCategory = async (category) => {
    const result = await get(ref(db, 'quizzes'));

    if (!result.exists()) {
        return [];
    }

    const quizzes = fromQuizDocument(result);
    return quizzes.filter(x => x.category === category);
};

export const getQuizzesByKeywords = async (keywords) => {
    const quizzesRef = ref(db, 'quizzes');
    const snapshot = await get(quizzesRef);
    const quizzes = [];

    snapshot.forEach((childSnapshot) => {
        const quiz = childSnapshot.val();
        const title = quiz.title.toLowerCase();

      
        const keywordInTitle = keywords.some(keyword => title.includes(keyword.toLowerCase()));

        if (keywordInTitle) {
            quizzes.push(quiz);
        }
    });

    return quizzes;
};

export const deleteQuiz = async (id) => {
    await remove(ref(db, `quizzes/${id}`));
};

export const updateQuiz = async (id, title, category, type, timer) => {
    await update(ref(db, `quizzes/${id}`), {
        title,
        category,
        type,
        timer,
    });
};

export const getQuizQuestions = async (id) => {
    const result = await get(ref(db, `quizzes/${id}/questions`));

    if (!result.exists()) {
        return [];
    }

    return fromQuizDocument(result);
};

export const addQuestion = async (id, question) => {
    await push(ref(db, `quizzes/${id}/questions`), question);
};

export const deleteQuestion = async (id, questionId) => {
    await remove(ref(db, `quizzes/${id}/questions/${questionId}`));
};

export const updateQuestion = async (id, questionId, question) => {
    await update(ref(db, `quizzes/${id}/questions/${questionId}`), question);
};

export const getQuizResults = async (id) => {
    const result = await get(ref(db, `quizzes/${id}/results`));

    if (!result.exists()) {
        return [];
    }

    return fromQuizDocument(result);
};


