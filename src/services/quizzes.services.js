import { ref, push, get, update, remove, getDatabase, onValue } from 'firebase/database';
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

export const createQuiz = async (title, category, type, username, questions, timer, activeTime, attemptTime, status = 'Not Started') => {
    const endActiveTime = Date.now() + activeTime * 60 * 60 * 1000;
    const result = await push(
        ref(db, 'quizzes'),
        {
            title,
            category,
            type,
            author: username,
            questions,
            timer,
            createdOn: new Date(Date.now()).toLocaleDateString(),
            maxPoints: 100,
            participants: [],
            isActive: true,
            status,
            activeTime,
            endActiveTime,
            attemptTime,
            isStarted: false,
            // remainingTime: activeTime * 3600,
        },
    );

    return getQuizById(result.key);
};

export const finishQuiz = async (id) => {
    const quizRef = ref(db, `quizzes/${id}`);
    await update(quizRef, {
        status: 'Finished',
        isStarted: false,
    });
};

export const ongoingQuiz = async (id, username) => {
    const quizRef = ref(db, `quizzes/${id}`);
    const quizSnapshot = await get(quizRef);
    const quizData = quizSnapshot.val();
    const endAttemptTime = Date.now() + quizData.attemptTime * 60 * 1000;
    const participants = quizData.participants || [];
    participants.push(username);
    await update(quizRef, {
        isStarted: true,
        endAttemptTime,
        participants,
        status: 'Ongoing',
    });
};
export const attemptTimeExceeded = async (id) => {
    const quizRef = ref(db, `quizzes/${id}`);
    await update(quizRef, {
        status: 'Finished',
        isStarted: false
    });
};

export const activeTimeExceeded = async (id) => {
    const quizRef = ref(db, `quizzes/${id}`);
    await update(quizRef, {
        isActive: false
    });
};
export const displayStatus = (id, setStatus) => {
    const quizRef = ref(db, `quizzes/${id}/status`);
    onValue(quizRef, (snapshot) => {
      setStatus(snapshot.val());
    });
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

export const updateQuiz = async (id, updatedQuiz) => {
    const db = getDatabase();
    await update(ref(db, `quizzes/${id}`), updatedQuiz);
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

export const QuizCategories = [
    'History',
    'Geography',
    'Science',
    'Mathematics',
    'Literature',
    'Arts',
    'Sports',
    'Movies',
    'Music',
    'Other',
];

export const QuizTypes = [
    'Invitational',
    'Open',
];

export const QuizTimer = [
    "15 minutes",
    "30 minutes",
    "45 minutes",
    "1 hour",
    "1 hour and 30 minutes",
    "2 hours",
    "2 hours and 30 minutes",
    "3 hours",
]

export const addQuizParticipant = async (quizId, username, result) => {
    const quizRef = ref(db, `quizzes/${quizId}`);
    const quizSnapshot = await get(quizRef);
    if (quizSnapshot.exists()) {
      const quiz = quizSnapshot.val();
      if (!quiz.participants) {
        quiz.participants = [];
      }
      quiz.participants.push({ username, result });
      await update(quizRef, { participants: quiz.participants });
    } else {
      console.error(`Quiz with ID ${quizId} does not exist`);
    }
  };

  export const storeQuizResult = async (username, quizId, result) => {
    const db = getDatabase();
    const userResultsRef = ref(db, `quizResults/${username}`);
  
    const newResult = {
      quizId,
      result,
    };

    await push(userResultsRef, newResult);
  };

  export const getUserQuizResults = async (username) => {
    const db = getDatabase();
    const userResultsRef = ref(db, `quizResults/${username}`);
    const snapshot = await get(userResultsRef);
    if (snapshot.exists()) {
      const results = snapshot.val();
      return Object.values(results).reduce((acc, result) => {
        acc[result.quizId] = result;
        return acc;
      }, {});
    } else {
      return {};
    }
  };

  export const getOngoingQuizzes = async () => {
    const db = getDatabase();
    const quizzesRef = ref(db, 'quizzes');
    const snapshot = await get(quizzesRef);
    
    if (snapshot.exists()) {
      const allQuizzes = Object.values(snapshot.val());
      const ongoingQuizzes = allQuizzes.filter(quiz => quiz.isActive);
      return ongoingQuizzes;
    } else {
      return [];
    }
  };

  export const getFinishedQuizzes = async () => {
    const db = getDatabase();
    const quizzesRef = ref(db, 'quizzes');
    const snapshot = await get(quizzesRef);
  
    if (snapshot.exists()) {
      const allQuizzes = Object.values(snapshot.val());
      const finishedQuizzes = allQuizzes.filter(quiz => !quiz.isActive);
      return finishedQuizzes;
    } else {
      return [];
    }
  };
