// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {deleteObject, getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import {manageAccount} from "./manage-account.service";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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



export const firebaseService = {

    getUrl: (path) =>{
        try {
            const imageRef = ref(storage,`${path}`)
            const response = getDownloadURL(imageRef);
            return response;
        }catch (e) {
            throw e
        }


    },

    uploadImage:  (file,path)=>{

        try{
            const imageRef = ref(storage,`${path}`)
            const response = uploadBytes(imageRef,file)
            return response

        }catch (e) {
            throw e
        }


       
    },

    removeImage: (path)=>{
        try{
            const imageRef = ref(storage,`${path}`)
            const response = deleteObject(imageRef)
            return response;
        }catch (e) {
            throw e
        }


    }


}







