import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  UserCredential
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export const signUp = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async (): Promise<void> => {
  return firebaseSignOut(auth);
};