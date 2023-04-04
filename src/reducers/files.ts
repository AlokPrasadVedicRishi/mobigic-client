import {
  GET_ALL_FILES,
  GET_ALL_FILES_ERROR,
  CLEAR_FILES_REDUCER,
  UPLOAD_DOCUMENTS_ERROR,
  UPLOAD_DOCUMENTS_SUCCESS,
  CLEAR_UPLOAD_FILES_REDUCER,
} from "../actions/Types";

export type Actions =
  | {
      type: typeof GET_ALL_FILES;
      payload: any;
    }
  | {
      type: typeof GET_ALL_FILES_ERROR;
      payload: any;
    }
  | {
      type: typeof CLEAR_FILES_REDUCER;
    }
  | {
      type: typeof UPLOAD_DOCUMENTS_SUCCESS;
      payload: any;
    }
  | {
      type: typeof UPLOAD_DOCUMENTS_ERROR;
      payload: string;
    }
  | {
      type: typeof CLEAR_UPLOAD_FILES_REDUCER;
    };

interface FileInterface {
  allFiles: any;
  allFilesError: string;
  uploadDocumentsSuccess: any;
  uploadDocumentsError: string;
}

export type State = FileInterface;

// Initial state of the reducer of type State
export const initialState: State = {
  allFiles: [],
  allFilesError: "",
  uploadDocumentsSuccess: {},
  uploadDocumentsError: "",
};

export const Files = (state: State = initialState, action: Actions) => {
  // switch between action.type
  switch (action.type) {
    // if action is of type GET_ALL_FILES return the state by setting the allFiles from the payload
    case GET_ALL_FILES:
      return {
        ...state,
        allFiles: action.payload,
        allFilesError: "",
      };

    // if action is of type GET_ALL_FILES_ERROR return the state by setting the error message in error and empty list of files
    case GET_ALL_FILES_ERROR:
      return {
        ...state,
        allFiles: [],
        allFilesError: action.payload,
      };

    // if action is of type CLEAR_FILES_REDUCER return the state by setting state to its initial state
    case CLEAR_FILES_REDUCER:
      return {
        ...state,
        allFiles: [],
        allFilesError: "",
        uploadDocumentsSuccess: {},
        uploadDocumentsError: "",
      };

    // if action is of type UPLOAD_DOCUMENTS_SUCCESS return the state by setting uploadDocumentsSuccess from payload and uploadDocumentsError as empty string
    case UPLOAD_DOCUMENTS_SUCCESS:
      return {
        ...state,
        uploadDocumentsSuccess: action.payload,
        uploadDocumentsError: "",
      };

    // if action is of type UPLOAD_DOCUMENTS_ERROR return the state by setting uploadDocumentsError from payload and uploadDocumentsSuccess as empty object
    case UPLOAD_DOCUMENTS_ERROR:
      return {
        ...state,
        uploadDocumentsSuccess: "",
        uploadDocumentsError: action.payload,
      };

    // if action is of type CLEAR_UPLOAD_FILES_REDUCER return the state by setting uploadDocumentsSuccess as empty object and uploadDocumentsError as empty string
    case UPLOAD_DOCUMENTS_ERROR:
      return {
        ...state,
        uploadDocumentsSuccess: {},
        uploadDocumentsError: "",
      };

    // return state as it is if action is not of any of the mentioned types
    default:
      return state;
  }
};
