import { ref, push, get, update, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../config/firebase-config';
import { QuizTypes } from './quizzes.services';

export const participationStatus = {
    notStarted: 'Not Started',
    ongoing: 'Ongoing',
    finished: 'Finished',
}

export const invitationStatus = {
    pending: 'Pending',
    accepted: 'Accepted',
    rejected: 'Rejected',
}
       
const fromDocument = snapshot => {
    const document = snapshot.val();

    return Object.keys(document).map(key => {
        const props = document[key];

        return {
            ...props,
            id: key,
        };
    });
}

export const joinPublicQuiz = async (quizId, username) => {
    const quizRef = ref(db, `quizzes/${quizId}`);
    const snapshot = await get(quizRef);
    if (snapshot.exists()) {
        const quiz = snapshot.val();
        // Public quiz
        if (quiz.type === QuizTypes[0]) {
        const newQuiz = {
            quizId,
            score: 0,
            status: participationStatus.notStarted,
        };
        await push(ref(db, `participants/${username}`), newQuiz);
        } else {
        console.error(`Quiz with ID ${quizId} is not active`);
        }
    } else {
        console.error(`Quiz with ID ${quizId} does not exist`);
    }
}

export const inviteUserToQuiz = async (quizId, quizTitle, username, educator) => {
    const quizRef = ref(db, `quizzes/${quizId}`);
    const snapshot = await get(quizRef);
    if (snapshot.exists()) {
        const quiz = snapshot.val();
        const today = new Date();
        // Invititational quiz
        if (quiz.type === QuizTypes[1] && new Date(quiz.startDate) <= today && new Date(quiz.endDate) >= today) {
        const newInvite = {
            educator,
            quizId,
            quizTitle,
            status: invitationStatus.pending,
        };
        await push(ref(db, `invitations/${username}`), newInvite);
        } else {
        console.error(`Quiz with ID ${quizId} is not active`);
        }
    } else {
        console.error(`Quiz with ID ${quizId} does not exist`);
    }
}

export const acceptInvitation = async (quizId, username) => {
    const invitationRef = ref(db, `invitations/${username}`);
    const snapshot = await get(invitationRef);
    if (snapshot.exists()) {
        const invitations = fromDocument(snapshot);
        const invitation = Object.values(invitations).find(i => i.quizId === quizId);
        if (invitation) {
           
        await update(ref(db, `invitations/${username}/${invitation.id}`), {
            status: invitationStatus.accepted,
        });
        const participation = {
            quizId,
            score: 0,
            status: participationStatus.notStarted,
        };
        await push(ref(db, `participants/${username}`), participation);
        } else {
        console.error(`Invitation with ID ${quizId} does not exist`);
        }
    } else {
        console.error(`Invitation with ID ${quizId} does not exist`);
    }
}

export const rejectInvitation = async (quizId, username) => {
    const invitationRef = ref(db, `invitations/${username}`);
    const snapshot = await get(invitationRef);
    if (snapshot.exists()) {
        const invitations = fromDocument(snapshot);
        const invitation = Object.values(invitations).find(i => i.quizId === quizId);
        if (invitation) {
        await update(ref(db, `invitations/${username}/${invitation.id}`), {
            status: invitationStatus.rejected,
        });
        } else {
        console.error(`Invitation with ID ${quizId} does not exist`);
        }
    } else {
        console.error(`Invitation with ID ${quizId} does not exist`);
    }
}

export const getInvitationsForStudent = async (username) => {
    const invitationRef = ref(db, `invitations/${username}`);
    const snapshot = await get(invitationRef);
    if (snapshot.exists()) {
        const invitations = fromDocument(snapshot);
        return Object.values(invitations.filter(i => i.status !== invitationStatus.accepted));
    } else {
        return [];
    }
}

export const getInvitationsForEducator = async (username) => {
    const invitationRef = ref(db, `invitations`);
    const snapshot = await get(invitationRef);
    if (snapshot.exists()) {
        const invitations = fromDocument(snapshot);
        const resp = Object.values(invitations).reduce((acc, invitation) => {
            const inv = Object.values(invitation).filter(i => i.educator === username);
            const map = inv.map(i => {
                return {
                    ...i,
                    student: invitation.id,
                }
            });
            acc.push(...map);
            return acc;
        }, []);
        return resp;
    } else {
        return [];
    }
}

export const getParticipations = async (username) => {
    const participationRef = ref(db, `participants/${username}`);
    const snapshot = await get(participationRef);
    if (snapshot.exists()) {
        const participations = snapshot.val();
        return Object.values(participations);
    } else {
        return [];
    }
}

export const getParticipation = async (username, quizId) => {
    const participationRef = ref(db, `participants/${username}`);
    const snapshot = await get(participationRef);
    if (snapshot.exists()) {
        const participations = snapshot.val();
        return Object.values(participations).find(p => p.quizId === quizId);
    } else {
        return null;
    }
}

export const getParticipationStatus = async (username, quizId) => {
    const participationRef = ref(db, `participants/${username}`);
    const snapshot = await get(participationRef);
    if (snapshot.exists()) {
        const participations = snapshot.val();
        const participation = Object.values(participations).find(p => p.quizId === quizId);
        if (participation) {
        return participation.status;
        } else {
        return null;
        }
    } else {
        return null;
    }
}

export const getParticipationScore = async (username, quizId) => {
    const participationRef = ref(db, `participants/${username}`);
    const snapshot = await get(participationRef);
    if (snapshot.exists()) {
        const participations = snapshot.val();
        const participation = Object.values(participations).find(p => p.quizId === quizId);
        if (participation) {
        return participation.score;
        } else {
        return null;
        }
    } else {
        return null;
    }
}

export const updateParticipationStatus = async (username, quizId ) => {
    const participationRef = ref(db, `participants/${username}`);
    const snapshot = await get(participationRef);
    if (snapshot.exists()) {
        const participations = snapshot.val();
        const participation = Object.values(participations).find(p => p.quizId === quizId);
        if (participation) {
        await update(ref(db, `participants/${username}/${participation.id}`), {
            participationStatus: participationStatus.ongoing,
        });
        } else {
        console.error(`Participation with ID ${quizId} does not exist`);
        }
    } else {
        console.error(`Participation with ID ${quizId} does not exist`);
    }
}

export const updateParticipationScore = async (username, quizId, score) => {
    const participationRef = ref(db, `participants/${username}`);
    const snapshot = await get(participationRef);
    if (snapshot.exists()) {
        const participations = snapshot.val();
        const participation = Object.values(participations).find(p => p.quizId === quizId);
        if (participation) {
        await update(ref(db, `participants/${username}/${participation.id}`), {
            score,
            status: participationStatus.finished,
        });
        } else {
        console.error(`Participation with ID ${quizId} does not exist`);
        }
    } else {
        console.error(`Participation with ID ${quizId} does not exist`);
    }
}

export const getParticipationsByQuizId = async (quizId) => {
    const participationRef = ref(db, `participants`);
    const snapshot = await get(participationRef);
    if (snapshot.exists()) {
        const participations = snapshot.val();
        return Object.values(participations).filter(p => p.quizId === quizId);
    } else {
        return [];
    }
}
