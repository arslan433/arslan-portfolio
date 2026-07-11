import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "./firebase";

export const auth = getAuth(app);

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => signOut(auth);
