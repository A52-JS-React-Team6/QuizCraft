import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth } from '../config/firebase-config';

export const registerUser = async (email, password) => {
  const registerResponse = await createUserWithEmailAndPassword(auth, email, password);
  return registerResponse;
};

export const loginUser = async (email, password) => {
  const loginResponse = await signInWithEmailAndPassword(auth, email, password);
  return loginResponse;
};

export const logoutUser = async () => {
  return await signOut(auth);
};