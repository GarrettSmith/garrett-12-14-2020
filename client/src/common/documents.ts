import { useEffect, useState } from "react";
import * as service from "./firebase";
import { validFileTypes, maxFileSize, searchDebounce } from "./constants";
import { formatFilesize } from "./format";
import { Document } from "./models";
import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";

export const useDocuments = (search: string) => {
  const [documents, setDocuments] = useState<Array<Document> | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(true);

  const getDocuments = async (search: string) => {
    setLoading(true);
    setError(undefined);
    try {
      const documents = await service.searchDocuments(search);
      setDocuments(documents);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedGetDocuments = useDebouncedCallback(
    getDocuments,
    searchDebounce
  );

  useEffect(() => {
    debouncedGetDocuments.callback(search);
  }, [search, debouncedGetDocuments]);

  return {
    loading,
    error,
    documents,
  };
};

const validateFile = (file: File) => {
  const errors = [];

  if (!validFileTypes.includes(file.type)) {
    errors.push(new Error(`Invalid File Type: '${file.type}'`));
  }

  if (file.size > maxFileSize) {
    errors.push(new Error(`File size too large: ${formatFilesize(file.size)}`));
  }

  return errors.length > 0 ? errors : null;
};

export const useUploadDocument = () => {
  const [lastUploaded, setLastUploaded] = useState<string | undefined>();
  const [errors, setErrors] = useState<Array<Error> | undefined>();
  const [loading, setLoading] = useState(false);

  const uploadDocument = async (file: File) => {
    setLoading(true);
    setErrors(undefined);
    setLastUploaded(undefined);
    try {
      const validationErrors = validateFile(file);
      if (validationErrors) throw validationErrors;
      await service.uploadDocument(file);
      setLastUploaded(file.name);
    } catch (e) {
      setErrors([...e]);
    } finally {
      setLoading(false);
    }
  };

  const clearErrors = () => setErrors(undefined);
  const clearLastUploaded = () => setLastUploaded(undefined);

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

  const deleteDocument = async () => {
    setLoading(true);
    try {
      await service.deleteDocument(name);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(undefined);

  return {
    error,
    loading,
    deleteDocument,
    clearError,
  };
};
