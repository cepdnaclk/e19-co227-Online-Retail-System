// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAKHik13hFqQQ36UjUazVRZ0A88ATWo8lc",
    authDomain: "online-retail-system.firebaseapp.com",
    projectId: "online-retail-system",
    storageBucket: "online-retail-system.appspot.com",
    messagingSenderId: "229330938122",
    appId: "1:229330938122:web:655bad450a56131cdbf2f3",
    measurementId: "G-EN4MDM1Y62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export default storage;
