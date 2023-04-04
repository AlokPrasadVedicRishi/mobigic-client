/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import { Button } from "../Common/Button/Button";
import { UploadFile } from "./UploadFile";

import { LoadingContext } from "../../contexts/Loading";
import { FilesContext } from "../../contexts/Files";
import { clearUploadFileReducer, uploadFile } from "../../actions/files";

import uploadSvg from "../../assets/images/uploadSvg.svg";
import useUserDetails from "../../hooks/useUserDetails";
import "../styles/upload-file.css";

export const Upload: React.FC = () => {
  const { dispatch: loadingDispatch } = useContext(LoadingContext);

  const { state: filesState, dispatch: filesDispatch } =
    useContext(FilesContext);

  const [showUploadFileLoader, setShowUploadFileLoader] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // validate token
  useUserDetails();

  // Use effect hook to clear file reducer when this component loads
  useEffect(() => {
    clearUploadFileReducer(filesDispatch);
  }, []);

  const uploadFiles = async (data: any) => {
    // start loading to show loader on screen
    setShowUploadFileLoader(true);

    // Call action creator to upload file
    await uploadFile(data)(filesDispatch, loadingDispatch);
  };

  useEffect(() => {
    // check if success and no error
    if (Object.keys(filesState.uploadDocumentsSuccess).length > 0) {
      // then execute success action
      afterUploadAction(2500);
    }

    if (filesState.uploadDocumentsError) {
      // then execute error action
      afterUploadAction(3000);
    }
  }, [filesState.uploadDocumentsError || filesState.uploadDocumentsSuccess]);

  // Function to be called when there is ans of upload action
  const afterUploadAction = (timer: number) => {
    // stop loading to hide loader on screen
    setShowUploadFileLoader(false);
    // to show message and wait for some time
    setTimeout(async () => {
      // clear the reducer messages
      clearUploadFileReducer(filesDispatch);
      toggleUploadModal();
    }, timer);
  };

  // Function to toggle upload file button
  const toggleUploadModal = () => {
    setShowUploadFileLoader(false);
    setShowUploadModal(!showUploadModal);
  };

  return (
    <div>
      <div className="upload-file-svg">
        <img src={uploadSvg} alt="Upload SVG" />
        <Button
          value="Upload File"
          id="upload-file"
          handleClick={toggleUploadModal}
          styles={{ minWidth: "300px" }}
        />
      </div>

      {showUploadModal && (
        <UploadFile
          showModal={showUploadModal}
          cancelClickFunction={toggleUploadModal}
          onSuccess={uploadFiles}
          showUploadFileLoader={showUploadFileLoader}
          filesState={filesState}
        />
      )}
    </div>
  );
};
