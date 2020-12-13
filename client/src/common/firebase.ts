import firebase from "firebase/app";
import "firebase/storage";
import "firebase/functions";

// Set the configuration for your app
const firebaseConfig = {
  apiKey: "AIzaSyA9eLEXFPMNIttFTlcZt6vImPOAaE9yPaA",
  authDomain: "garrett-12-14-2020.firebaseapp.com",
  projectId: "garrett-12-14-2020",
  storageBucket: "garrett-12-14-2020.appspot.com",
  messagingSenderId: "885719165107",
  appId: "1:885719165107:web:71a5aa03311777029fa8c6",
};
const app = firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = app.storage();

const storageRef = storage.ref();
export const documentsRef = storageRef.child("documents");

// Get a reference to the functions service, which is use to call your cloud functions
const functions = app.functions();

export const searchDocuments = functions.httpsCallable("searchDocuments");