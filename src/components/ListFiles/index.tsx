/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { ListFiles } from "./ListFiles";

// context of Loader
import { LoadingContext } from "../../contexts/Loading";
import { FilesContext } from "../../contexts/Files";
import { deleteFile, getAllFiles, verifyCode } from "../../actions/files";

import useUserDetails from "../../hooks/useUserDetails";
import "../styles/list-files.css";
import addIcon from "../../assets/icons/add.svg";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../Common/ConfirmationModal";
import { DownLoadFile } from "./DownloadFile";

export const ListUserFiles: React.FC = () => {
  //Get the state and the dispatch properties form the LoadingContext and rename them to loadingState and loadingDispatch resp.
  const { state: loadingState, dispatch: loadingDispatch } = useContext(
    // context of loader
    LoadingContext
  );
  //Get the state and the dispatch properties form the PAYEEONBAORDING and rename them to transactionsState and transactionsDispatch resp.
  const { state: filesState, dispatch: filesDispatch } = useContext(
    // context of payeeOnBoarding
    FilesContext
  );

  const [userFiles, setUserFiles] = useState<any[]>([]);
  const [showVerifyCodeModal, setShowVerifyCodeModal] =
    useState<boolean>(false);
  const [currentFileToDownload, setCurrentFileToDownload] = useState<number>();
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [currentFileToDelete, setCurrentFileToDelete] = useState<number>();
  const [uniqueCode, setUniqueCode] = useState<string>("");
  const [showVerifyCodeLoader, setShowVerifyCodeLoader] =
    useState<boolean>(false);
  const [uniqueCodeError, setUniqueCodeError] = useState<string>("");

  const navigate = useNavigate();

  // validate token
  const decodedToken = useUserDetails();

  useEffect(() => {
    getAllUserFiles();
  }, []);

  // Function to get AllFIle details
  const getAllUserFiles = async () => {
    await getAllFiles(decodedToken.id)(filesDispatch, loadingDispatch);
  };

  // Setting the Search result whenever the reduecr value changes
  useEffect(() => {
    setUserFiles(filesState.allFiles);
  }, [filesState.allFiles]);

  const navigateToFileUpload = () => {
    navigate("/upload");
  };

  const handleDeleteIconClick = async (fileId: number) => {
    setShowConfirmationModal(true);
    setCurrentFileToDelete(fileId);
  };

  const handleDelete = async () => {
    if (currentFileToDelete)
      await deleteFile(currentFileToDelete)(filesDispatch, loadingDispatch);
    toggleConfirmModal();
  };

  // Function for toggling confirm modal
  const toggleConfirmModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  useEffect(() => {
    if (filesState.deleteFileSuccess) {
      getAllUserFiles();
    }
  }, [filesState.deleteFileSuccess, filesState.deleteFileError]);

  const handleDownload = async (fileId: number) => {
    setCurrentFileToDownload(fileId);
    setShowVerifyCodeModal(true);
  };

  const onVerificationModalCancelClick = () => {
    setShowVerifyCodeModal(false);
    setUniqueCode("");
    setUniqueCodeError("");
  };

  const handleUniqueCodeChange = (e: any) => {
    setUniqueCode(e.target.value);
  };

  const verifyUniqueCode = async () => {
    setShowVerifyCodeLoader(true);
    await verifyCode(uniqueCode, currentFileToDownload!)(
      filesDispatch,
      loadingDispatch
    );

    setShowVerifyCodeLoader(false);
  };

  useEffect(() => {
    if (Object.keys(filesState.verifyUniqueCodeSuccess).length > 0) {
      onVerificationModalCancelClick();

      const link = document.createElement("a");
      link.href = filesState.verifyUniqueCodeSuccess.file_url;

      link.click();
    } else if (filesState.verifyUniqueCodeError) {
      setUniqueCodeError(filesState.verifyUniqueCodeError);
    }
  }, [filesState.verifyUniqueCodeSuccess, filesState.verifyUniqueCodeError]);

  return (
    <div className="list-user-files-main-container">
      <div className="add-icon-container">
        <img src={addIcon} onClick={() => navigateToFileUpload()} alt="" />
      </div>

      <ListFiles
        fileDetails={userFiles}
        allFilesError={filesState.allFilesError}
        showLoader={loadingState.loading}
        onDeleteIconClick={handleDeleteIconClick}
        onDownLoadClick={handleDownload}
      />

      {showConfirmationModal && (
        <ConfirmationModal
          showModal={showConfirmationModal}
          modalText={"Are you sure you want to delete the selected file?"}
          deleteButtonClick={handleDelete}
          deleteStatus={""}
          cancelButtonClick={toggleConfirmModal}
          deleteButtonText={"Delete"}
        />
      )}

      {showVerifyCodeModal && (
        <DownLoadFile
          uniqueCode={uniqueCode}
          showModal={showVerifyCodeModal}
          handleUniqueCodeChange={handleUniqueCodeChange}
          cancelClickFunction={onVerificationModalCancelClick}
          onVerifyClick={verifyUniqueCode}
          showVerifyCodeLoader={showVerifyCodeLoader}
          uniqueCodeVerificationError={uniqueCodeError}
        />
      )}
    </div>
  );
};
