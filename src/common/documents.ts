import { useEffect, useState } from "react";
import { storage } from "./firebase";
import firebase from "firebase/app";
import { filesizeFormat, validFileTypes, maxFileSize } from "./constants";
import numeral from "numeral";

export interface Document {
  name: string;
  size: number;
}

async function toDocument(item: firebase.storage.Reference): Promise<Document> {
  const metadata = await item.getMetadata();
  return {
    name: item.name,
    size: metadata.size,
  };
}

const storageRef = storage.ref();
const documentsRef = storageRef.child("documents");

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Array<Document> | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDocuments() {
      setLoading(true);
      setError(undefined);
      try {
        const { items } = await documentsRef.listAll();
        const documents = await Promise.all(items.map(toDocument));
        setDocuments(documents);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getDocuments();
  }, []);

  return {
    loading,
    error,
    documents,
  };
};

function validateFile(file: File) {
  const errors = [];
  if (!validFileTypes.includes(file.type)) {
    errors.push(new Error(`Invalid File Type: '${file.type}'`));
  }
  if (file.size > maxFileSize) {
    errors.push(
      new Error(
        `File size too large: ${numeral(file.size).format(filesizeFormat)}`
      )
    );
  }
  return errors;
}

export const useUploadDocument = () => {
  const [lastUploaded, setLastUploaded] = useState<string | undefined>();
  const [errors, setErrors] = useState<Array<Error> | undefined>();
  const [loading, setLoading] = useState(false);

  function uploadDocument(file: File) {
    setLoading(true);
    setErrors(undefined);
    setLastUploaded(undefined);

    const validationErrors = validateFile(file);
    if (validationErrors.length) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const docRef = documentsRef.child(file.name);
    const uploadTask = docRef.put(file);

    const next = (snapshot: firebase.storage.UploadTaskSnapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // switch (snapshot.state) {
      //   case firebase.storage.TaskState.PAUSED: // or 'paused'
      //     console.log("Upload is paused");
      //     break;
      //   case firebase.storage.TaskState.RUNNING: // or 'running'
      //     console.log("Upload is running");
      //     break;
      // }
    };
    const error = (e: firebase.storage.FirebaseStorageError) => {
      setLoading(false);
      setErrors([e]);
    };
    const complete: firebase.Unsubscribe = async () => {
      // Upload completed successfully, now we can get the download URL
      // const url = await uploadTask.snapshot.ref.getDownloadURL();
      setLastUploaded(file.name);
      setLoading(false);
    };
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  }

  function clearErrors() {
    setErrors(undefined);
  }

  function clearLastUploaded() {
    setLastUploaded(undefined);
  }

  return {
    loading,
    errors,
    uploadDocument,
    lastUploaded,
    clearErrors,
    clearLastUploaded,
  };
};

export const useDeleteDocument = (name: string) => {
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(false);

  async function deleteDocument() {
    setLoading(true);

    const docRef = documentsRef.child(name);

    try {
      await docRef.delete();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  function clearError() {
    setError(undefined);
  }

  return {
    error,
    loading,
    deleteDocument,
    clearError,
  };
};
