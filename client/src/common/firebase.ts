import firebase from "firebase/app";
import "firebase/storage";
import "firebase/functions";
import { FunctionDocument } from "./models";

// Set the configuration for your app
// TODO move to a configuration file
// TODO load different configuration based on environment
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
const documentsRef = storageRef.child("documents");

// Get a reference to the functions service, which is use to call your cloud functions
const functions = app.functions();

const searchFunction = functions.httpsCallable("searchDocuments");

export const searchDocuments = async (search: string) => {
  const { data: documents } = await searchFunction(search);
  // TODO validate response structure
  return documents as Array<FunctionDocument>;
};

export const deleteDocument = (name: string) =>
  documentsRef.child(name).delete() as Promise<void>;

export const uploadDocument = (file: File) =>
  new Promise<FunctionDocument>((resolve, reject) => {
    const uploadTask = documentsRef.child(file.name).put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
      error: reject,
      complete: () => resolve({ name: file.name, size: file.size }),
    });
  });
