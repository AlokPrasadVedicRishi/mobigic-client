/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal } from "../Common/Modal/Modal";
import "../styles/upload-file.css";
import { Button } from "../Common/Button/Button";
import file from "../../assets/images/file.svg";
import cross from "../../assets/images/cross.svg";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  showModal: boolean;
  cancelClickFunction: any;
  onSuccess: any;
  showUploadFileLoader: boolean;
  uploadFileSuccess: any;
  uploadFileError: string;
}

export const UploadFile: React.FC<Props> = ({
  showModal,
  cancelClickFunction,
  onSuccess,
  showUploadFileLoader,
  uploadFileSuccess,
  uploadFileError,
}) => {
  // For Storing selected Files
  const [selectedFile, setSelectedFile] = useState<any>(null);

  // For Setting Loader Value
  const [showLoader, setShowLoader] = useState(false);
  // For Setting Error msg
  const [error, setError] = useState("");

  // Function for handle file change
  const handleFileChange = (e: any) => {
    // Set loading as true
    setShowLoader(true);

    let allFiles = e.target.files;

    if (allFiles.length > 1) {
      setError("Multiple files upload not allowed");
    }

    let fileSize = allFiles[0].size;

    allFiles[0].fileSize = getFileSize(fileSize);

    setSelectedFile(allFiles[0]);

    // Set loading as false
    setShowLoader(false);
  };

  const getFileSize = (fileSize: number) => {
    let suffix = "bytes";
    let size = fileSize;
    if (size >= 1024 && size < 1024000) {
      suffix = "KB";
      size = Math.round((size / 1024) * 100) / 100;
    } else if (size >= 1024000) {
      suffix = "MB";
      size = Math.round((size / 1024000) * 100) / 100;
    }
    return size + " " + suffix;
  };

  // Function to delete selected files
  const deleteFileSelectedFile = () => {
    setSelectedFile(null);
  };

  const onUploadClick = async () => {
    // Call the Success function with the selected file
    await onSuccess(selectedFile);
  };

  useEffect(() => {
    setSelectedFile(null);
  }, [uploadFileSuccess, uploadFileError]);

  return (
    <div>
      {/* Modal */}
      <Modal
        showModal={showModal}
        isFlexible={true}
        showHeader={true}
        headerTitle={"Upload Documents"}
      >
        {/* Main Container */}
        <div className="upload-file-container">
          {/* Browse File Container */}
          {!selectedFile && (
            <div className="browse-container">
              {/* File Image */}
              <img src={file} alt="" />
              {/* Input Field for selecting files */}
              <input
                type="file"
                hidden
                id="payee-upload-file"
                multiple={false}
                onChange={(e) => handleFileChange(e)}
              />
              <label htmlFor="payee-upload-file" className="browse-files-label">
                Browse
              </label>
            </div>
          )}

          {/* Container for showing success and error messages */}
          <div>
            {/* If show loader is true then show the loader */}
            {showUploadFileLoader ? (
              <div className="file-upload-loader">
                <ClipLoader size={20} />
                <p>Please wait uploading</p>
              </div>
            ) : // If success message is present then show success message
            Object.keys(uploadFileSuccess).length > 0 ? (
              <div className="file-upload-success">
                <div className="file-upload-unique-code">
                  <p>{uploadFileSuccess.uniqueHexCode}</p>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        uploadFileSuccess.uniqueHexCode
                      )
                    }
                    className="file-upload-unique-code-copy"
                  >
                    Copy
                  </button>
                </div>
                <p className="file-upload-success-msg" id="upload-file-success">
                  {uploadFileSuccess.message}
                </p>
              </div>
            ) : (
              uploadFileError && (
                <div>
                  {/* // If error message is present then show error message */}
                  <p className="file-upload-error-msg" id="upload-file-error">
                    {uploadFileError}
                  </p>
                </div>
              )
            )}
          </div>

          {/* Show the error msg if the files selected is greater than 1 */}
          {error && <p className="file-upload-error-msg">{error}</p>}

          {/* uploaded files Container */}
          <div className="uploaded-files-container">
            {
              // If showLoading is true then show Loader until processing
              showLoader ? (
                <div className="file-content-loader">
                  <ClipLoader size={50} />
                </div>
              ) : (
                // Map selected files if fileLength is greater than 0
                selectedFile && (
                  <div className="single-file-container">
                    {/* File name */}
                    <p id={"uploaded-file-name"}>
                      {selectedFile.name}{" "}
                      <span className="file-size">{selectedFile.fileSize}</span>
                    </p>
                    {/* Cross icon */}
                    <img
                      src={cross}
                      id={"uploaded-file-cross-icon"}
                      // onClick call deleteFile function
                      onClick={() => deleteFileSelectedFile()}
                      alt=""
                    />
                  </div>
                )
              )
            }
          </div>

          {/* Button Container */}
          <div className="upload-container">
            {/* Cancel Button */}
            <Button
              value="Cancel"
              id="cancel"
              // OnClick close the upload button
              handleClick={() => cancelClickFunction()}
              styles={{
                backgroundColor: "#e0e0e0",
                color: "#828282",
                minWidth: "120px",
              }}
            />

            {/* Upload button */}
            <Button
              value="Upload"
              id="upload"
              handleClick={() => onUploadClick()}
              styles={{ minWidth: "120px" }}
              secondaryClassName={!selectedFile ? "button-disabled" : ""}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
