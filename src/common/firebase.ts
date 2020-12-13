import firebase from "firebase/app";
import "firebase/storage";

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
export const storage = app.storage();