// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCOG72mmhtvSZZY0ct7Wa6McqpW_faUNH4",
	authDomain: "user-data29.firebaseapp.com",
	projectId: "user-data29",
	storageBucket: "user-data29.appspot.com",
	messagingSenderId: "27550519517",
	appId: "1:27550519517:web:1f2d55ca4332c3a64fcb34",
	measurementId: "G-4BFQCMSSFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();