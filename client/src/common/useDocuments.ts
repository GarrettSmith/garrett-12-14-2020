import { useCallback, useEffect, useReducer } from "react";
import * as service from "./firebase";
import { searchDebounce } from "./constants";
import { validateFile } from "./validations";
import { Document } from "./models";
import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";

interface State {
  getting: boolean;
  uploading: boolean;
  deleting: Array<string>;
  documents: Array<Document> | null;
  errors: Array<Error>;
}

type Action =
  | { type: "get-start"; search: string }
  | { type: "get-error"; error: Error }
  | { type: "get-success"; documents: Array<Document> }
  | { type: "upload-start"; }
  | { type: "upload-error"; errors: Array<Error> }
  | { type: "upload-success"; document: Document }
  | { type: "delete-start"; documentName: string }
  | { type: "delete-error"; documentName: string; error: Error }
  | { type: "delete-success"; documentName: string }
  | { type: "clear-error"; error: Error };

const initialState: State = {
  getting: false,
  uploading: false,
  deleting: [],
  documents: null,
  errors: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "get-start":
      return {
        ...state,
        getting: true,
      };
    case "get-error":
      return {
        ...state,
        getting: false,
        errors: [ ...state.errors, action.error],
      };
    case "get-success":
      return {
        ...state,
        getting: false,
        documents: action.documents,
      };

    case "upload-start":
      return {
        ...state,
        uploading: true,
      };
    case "upload-error":
      return {
        ...state,
        uploading: false,
        errors: [...state.errors, ...action.errors],
      };
    case "upload-success":
      return {
        ...state,
        uploading: false,
        documents: [
          ...(state.documents || []),
          // Don't add duplicated documents
          ...(state.documents?.find(x => x.name === action.document.name) ? [] : [action.document])
        ],
      };

    case "delete-start":
      return {
        ...state,
        deleting: [...state.deleting, action.documentName],
      };
    case "delete-error":
      return {
        ...state,
        deleting: state.deleting.filter((x) => x !== action.documentName),
        errors: [...state.errors, action.error],
      };
    case "delete-success":
      return {
        ...state,
        deleting: state.deleting.filter((x) => x !== action.documentName),
        documents: state.documents?.filter(
          (x) => x.name !== action.documentName
        ) ?? null,
      };

    case "clear-error":
      return {
        ...state,
        errors: state.errors.filter((x) => x !== action.error),
      };

    default:
      throw new Error(`Unknown action`);
  }
};

export const useDocuments = (search: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getDocuments = useDebouncedCallback(async (search: string) => {
    dispatch({ type: "get-start", search });
    try {
      const documents = await service.searchDocuments(search);
      dispatch({ type: "get-success", documents })
    } catch (error) {
      dispatch({ type: "get-error", error })
    }
  }, searchDebounce);

  const uploadDocument = useCallback(async (file: File) => {
    dispatch({ type: "upload-start" });
    try {
      const validationErrors = validateFile(file);
      if (validationErrors) throw validationErrors;
      const document = await service.uploadDocument(file);
      dispatch({ type: "upload-success", document })
    } catch (e) {
      const errors = Array.isArray(e) ? e : [e];
      dispatch({ type: "upload-error", errors })
    }
  }, [dispatch]);

  const deleteDocument = useCallback(async (documentName: string) => {
    dispatch({ type: "delete-start", documentName });
    try {
      await service.deleteDocument(documentName);
      dispatch({ type: "delete-success", documentName });
    } catch (error) {
      dispatch({ type: "delete-error", documentName, error });
    }
  }, [dispatch]);

  const clearError = useCallback(
    (error: Error) => dispatch({ type: "clear-error", error }),
    [dispatch]
  );

  useEffect(() => {
    getDocuments.callback(search);
  }, [search, getDocuments]);

  return {
    state,
    uploadDocument,
    deleteDocument,
    clearError,
  };
};
