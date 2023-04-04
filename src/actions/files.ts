import { Actions } from "../reducers/files";
import axios from "axios";
import { Actions as LoadingActions } from "./../reducers/loading";
import { startLoading, stopLoading } from "./loading";
import { API_URL } from "./serverConnection";
import {
  GET_ALL_FILES,
  GET_ALL_FILES_ERROR,
  CLEAR_FILES_REDUCER,
  UPLOAD_DOCUMENTS_ERROR,
  UPLOAD_DOCUMENTS_SUCCESS,
  CLEAR_UPLOAD_FILES_REDUCER,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_ERROR,
  VERIFY_UNIQUE_CODE_SUCCESS,
  VERIFY_UNIQUE_CODE_ERROR,
} from "./Types";

// Action Creator for fetching all files of the user
export const getAllFiles =
  (userId: string) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      // dispatch start loading
      startLoading(loadingDispatch);

      // fetch the results from the Files API
      const result = await axios.get(`${API_URL}/files/${userId}`);

      // Dispatch the result with GET_ALL_FILES type action
      dispatch({
        type: GET_ALL_FILES,
        payload: result.data.data,
      });

      // Stop loading
      stopLoading(loadingDispatch);
    } catch (err: any) {
      // if error response then dispatch error action
      dispatch({
        type: GET_ALL_FILES_ERROR,
        payload: err.response
          ? err.response.data?.message
          : "Unable to connect to server",
      });

      // In case of error, stop loading
      stopLoading(loadingDispatch);
    }
  };

// Action Creator for uploading file
export const uploadFile =
  (data: any) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ): Promise<boolean> => {
    try {
      // dispatch start loading
      startLoading(loadingDispatch);

      let formData: any = new FormData();

      formData.append(`file`, data);

      const result: any = await axios.post(`${API_URL}/files/upload`, formData);

      // Dispatch the result with UPLOAD_DOCUMENTS_SUCCESS type action
      dispatch({
        type: UPLOAD_DOCUMENTS_SUCCESS,
        payload: result.data,
      });

      // Stop loading
      stopLoading(loadingDispatch);
      return true;
    } catch (err: any) {
      // if error response then dispatch error action
      dispatch({
        type: UPLOAD_DOCUMENTS_ERROR,
        payload: err.response
          ? err.response.data?.message
          : "Unable to connect to server",
      });

      // In case of error, stop loading
      stopLoading(loadingDispatch);
      return false;
    }
  };

// Action Creator for deleting a file
export const deleteFile =
  (fileId: number) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      // dispatch start loading
      startLoading(loadingDispatch);

      // api call to delete file
      const result = await axios.delete(`${API_URL}/files/${fileId}`);

      // Dispatch the result with DELETE_FILE type action
      dispatch({
        type: DELETE_FILE_SUCCESS,
        payload: result.data.message,
      });

      // Stop loading
      stopLoading(loadingDispatch);
    } catch (err: any) {
      // if error response then dispatch error action
      dispatch({
        type: DELETE_FILE_ERROR,
        payload: err.response
          ? err.response.data?.message
          : "Unable to connect to server",
      });

      // In case of error, stop loading
      stopLoading(loadingDispatch);
    }
  };

// Action Creator for verifying unique code
export const verifyCode =
  (uniqueCode: string, fileId: number) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      // dispatch start loading
      startLoading(loadingDispatch);

      // api call to delete file
      const result = await axios.post(`${API_URL}/files/verify`, {
        fileId,
        uniqueCode,
      });

      // Dispatch the result with VERIFY_UNIQUE_CODE_SUCCESS type action
      dispatch({
        type: VERIFY_UNIQUE_CODE_SUCCESS,
        payload: result.data.data,
      });

      // Stop loading
      stopLoading(loadingDispatch);
    } catch (err: any) {
      // if error response then dispatch error action
      dispatch({
        type: VERIFY_UNIQUE_CODE_ERROR,
        payload: err.response
          ? err.response.data?.message
          : "Unable to connect to server",
      });

      // In case of error, stop loading
      stopLoading(loadingDispatch);
    }
  };

//Action creator for clearing files reducer
export const clearFileReducer = (dispatch: React.Dispatch<Actions>) => {
  // Dispatch CLEAR_FILES_REDUCER type
  dispatch({
    type: CLEAR_FILES_REDUCER,
  });
};

//Action creator for clearing states related to currently uploaded file
export const clearUploadFileReducer = (dispatch: React.Dispatch<Actions>) => {
  // Dispatch CLEAR_FILES_REDUCER type
  dispatch({
    type: CLEAR_UPLOAD_FILES_REDUCER,
  });
};
