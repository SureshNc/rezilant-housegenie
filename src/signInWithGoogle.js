import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebaseConfig';

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // Return the user information
    return result.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default signInWithGoogle;
