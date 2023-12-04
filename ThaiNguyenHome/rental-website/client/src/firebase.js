// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'sleepez-e496d.firebaseapp.com',
    projectId: 'sleepez-e496d',
    storageBucket: 'sleepez-e496d.appspot.com',
    messagingSenderId: '365306885660',
    appId: '1:365306885660:web:6c9f693dff623fe6a6d1d9',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
