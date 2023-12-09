import { useEffect, useState } from 'react';
import { onValue, ref, off } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { activeTimeExceeded } from '../../services/quizzes.services';

export const ActiveTimer = ({ quizId }) => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);


    useEffect(() => {
        const quizRef = ref(db, `quizzes/${quizId}`);
        const listener = onValue(quizRef, (snapshot) => {
            const quiz = snapshot.val();
            if (quiz && quiz.isActive) {
                const currentTime = Date.now();
                const remainingTime = Math.max(0, quiz.endActiveTime - currentTime);
                setRemainingTime(remainingTime);

                if (remainingTime <= 0) {
                    activeTimeExceeded(quizId);
                }
            }
        });

        return () => {
            off(quizRef, listener);
        };
    }, [quizId]);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevTime => Math.max(0, prevTime - 1000));
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);


    const hours = Math.floor(remainingTime / 3600 / 1000);
    const minutes = Math.floor((remainingTime % (3600 * 1000)) / 60 / 1000);
    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

    return (
        <div>{remainingTime > 0 ? `${hours}h ${minutes}m ${seconds}s` : 'Active Time Exceeded'}</div>
    );
};