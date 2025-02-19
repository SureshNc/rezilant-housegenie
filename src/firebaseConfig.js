import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCINYcE2h8UOsSvXFMts3JQ_ksuZl2t36c",
    authDomain: "housegeniesignin.firebaseapp.com",
    projectId: "housegeniesignin",
    storageBucket: "housegeniesignin.firebasestorage.app",
    messagingSenderId: "800216830239",
    appId: "1:800216830239:web:94659dc74c0614d4f9a02a",
    measurementId: "G-SJPQC0LF5T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
