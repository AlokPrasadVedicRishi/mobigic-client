/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { ListFiles } from "./ListFiles";

// context of Loader
import { LoadingContext } from "../../contexts/Loading";
import { FilesContext } from "../../contexts/Files";
import { getAllFiles } from "../../actions/files";

import useUserDetails from "../../hooks/useUserDetails";
import "../styles/list-files.css";
import addIcon from "../../assets/icons/add.svg";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <div className="add-icon-container">
        <img src={addIcon} onClick={() => navigateToFileUpload()} alt="" />
      </div>
      <div>
        <ListFiles
          fileDetails={userFiles}
          allFilesError={filesState.allFilesError}
          showLoader={loadingState.loading}
        />
      </div>
    </div>
  );
};
