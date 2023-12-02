import { get, set, ref, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getUserDocument = async (username) => {
  const userDocument = await get(ref(db, `users/${username}`));
  return userDocument;
};

export const getUser = async (username) => {
  const userDocument = await getUserDocument(username);
  return userDocument.val();
};

export const checkIfUserExists = async (username) => {
    const user = await getUserDocument(username);
    return user.exists();
}


export const createUser = async (user) => {
  await set(ref(db, `users/${user.username}`), 
  { username: user.username, firstName: user.firstName, lastName: user.lastName, uid: user.uid, email: 
    user.email, isAdmin: false, createdOn: new Date(), role: user.role });
    const userData = await getUser(user.username);
    return userData;
};

export const updateUser = async (user) => {
  await update(ref(db, `users/${user.username}`), 
  { firstName: user.firstName, lastName: user.lastName, email: 
    user.email, phone: user.phone, photoName: user.photoName, address: user.address });
    const userData = await getUser(user.username);
    return userData;
}

const fromUsersDocument = snapshot => {
  const usersDocument = snapshot.val();

  return Object.keys(usersDocument).map(key => {
    const user = usersDocument[key];

    return {
      ...user,
      id: key,
      createdOn: new Date(user.createdOn)
    };
  });
}

export const getAllUsers = () => {
  return get(ref(db, 'users/'))
  .then(snapshot => {
    if (!snapshot.exists()) {
      return [];
    }
    return fromUsersDocument(snapshot);
  })
};

export const setToAdmin = async (username) => {
  return await update(ref(db, `users/${username}`), {
    isAdmin: true
  });
};

export const unSetToAdmin = async (username) => {
  return await update(ref(db, `users/${username}`), {
    isAdmin: false
  });
};

export const banUser = async (username) => {
  return await update(ref(db, `users/${username}`), {
    isBanned: true
  });
};

export const unBanUser = async (username) => {
  return await update(ref(db, `users/${username}`), {
    isBanned: false
  });
};