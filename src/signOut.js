import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error(error);
  }
};

export default signOutUser;
