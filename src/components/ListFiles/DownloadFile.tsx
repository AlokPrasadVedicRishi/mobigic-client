import { ClipLoader } from "react-spinners";
import { Button } from "../Common/Button/Button";
import { Modal } from "../Common/Modal/Modal";
import { TextField } from "../Common/TextField/TextField";
import "../styles/download-file.css"
interface Props {
  uniqueCode: string;
  showModal: boolean;
  handleUniqueCodeChange: (e: any) => void;
  cancelClickFunction: any;
  onVerifyClick: (uniqueCode: string) => void;
  showVerifyCodeLoader: boolean;
  uniqueCodeVerificationError: string;
}

export const DownLoadFile: React.FC<Props> = ({
  uniqueCode,
  showModal,
  handleUniqueCodeChange,
  cancelClickFunction,
  onVerifyClick,
  showVerifyCodeLoader,
  uniqueCodeVerificationError,
}) => {
  return (
    <Modal
      showModal={showModal}
      isFlexible={true}
      showHeader={true}
      headerTitle={"Enter six digit unique code "}
    >
      {showVerifyCodeLoader ? (
        <div className="file-upload-loader">
          <ClipLoader size={20} />
          <p>Please wait Verifying...</p>
        </div>
      ) : (
        <div className="verify-modal-container">
          <TextField
            value={uniqueCode}
            placeholder="Enter unique code for this file"
            label="Unique Code"
            handleChange={handleUniqueCodeChange}
            id="unique_code_input_field"
            type="text"
          />
          {uniqueCodeVerificationError && (
            <span className="unique-code-error">
              {uniqueCodeVerificationError}
            </span>
          )}

          <div className="verify-code-button-container">
            <Button
              value="Cancel"
              handleClick={cancelClickFunction}
              id="verify_code_button"
            />

            <Button
              value="Verify"
              handleClick={onVerifyClick}
              id="verify_code_button"
              secondaryClassName={
                uniqueCode.length < 6 ? "button-disabled" : ""
              }
            />
          </div>
        </div>
      )}
    </Modal>
  );
};
