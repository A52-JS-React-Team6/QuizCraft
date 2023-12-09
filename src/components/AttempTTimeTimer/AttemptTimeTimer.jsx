import { useEffect, useState } from 'react';
import { onValue, ref, off } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { attemptTimeExceeded } from '../../services/quizzes.services';

export const AttemptTimeTimer = ({ quizId }) => {
    const [remainingTime, setRemainingTime] = useState(null);
    const [isTimeExceeded, setIsTimeExceeded] = useState(false);

    useEffect(() => {
        const quizRef = ref(db, `quizzes/${quizId}`);
        const listener = onValue(quizRef, (snapshot) => {
            const quiz = snapshot.val();
            if (quiz && quiz.isStarted) {
                const currentTime = Date.now();
                const remainingTime = Math.max(0, quiz.endAttemptTime - currentTime);
                setRemainingTime(remainingTime);
            }
        });

        const timer = setInterval(() => {
            setRemainingTime(prevTime => {
                const newTime = Math.max(0, prevTime - 1000);
                if (newTime === 0) {
                    setIsTimeExceeded(true);
                }
                return newTime;
            });
        }, 1000);

        return () => {
            off(quizRef, listener);
            clearInterval(timer);
        };
    }, [quizId]);

    useEffect(() => {
        if (isTimeExceeded) {
            attemptTimeExceeded(quizId);
        }
    }, [isTimeExceeded, quizId]);

    const minutes = Math.floor((remainingTime % (3600 * 1000)) / 60 / 1000);
    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

    return (
        <div>{remainingTime !== null ? (remainingTime > 0 ? `${minutes}m ${seconds}s` : 'Attempt Time Exceeded') : 'Waiting to start'}</div>
    );
};