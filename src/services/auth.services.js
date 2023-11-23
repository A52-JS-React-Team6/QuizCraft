// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth} from 'firebase/auth';
// import { auth } from '../config/firebase-config';

// export const registerUser = (email, password) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };
 
// export const loginUser = (email, password) => {
//   return signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => userCredential)
//     .catch((error) => {
//       console.error(error.code, error.message);
//       throw error;
//     });
// };

export const logoutUser = () => {
  return signOut(auth);
};