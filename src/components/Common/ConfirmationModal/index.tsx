import React from "react";
import { Button } from "../Button/Button";
import "../../styles/confirmation-modal.css";
import { Modal } from "../Modal/Modal";

interface Props {
  history?: History;
  showModal: boolean;
  modalText: string;
  deleteStatus: string;
  cancelButtonClick: () => void;
  deleteButtonClick: any;
  deleteButtonText?: string;
  disallowDelete?: boolean;
}

//Modal for confirmation of delete
export const ConfirmationModal: React.FC<Props> = ({
  modalText,
  showModal,
  deleteStatus,
  cancelButtonClick,
  deleteButtonClick,
  deleteButtonText,
  disallowDelete,
}) => {
  return (
    <Modal
      showModal={showModal} //state value to toggle the modal
      modalStyle={{ height: "25%" }}
    >
      <div className="delete-confirmation-container">
        {/* Hard coded confirmation message  */}
        <div className="confirmation-message">{modalText}</div>
        {/* Display the message coming from the server as response */}
        <div className="delete-status">{deleteStatus}</div>

        <div className="delete-button-container">
          <Button
            styles={{
              backgroundColor: "#e0e0e0",
              minWidth: "120px",
              color: "#4f4f4f",
            }}
            id="cancel-delete"
            value={"Cancel"}
            handleClick={cancelButtonClick}
          />

          {!disallowDelete && (
            <Button
              styles={{ minWidth: "120px" }}
              id="confirm-delete"
              value={deleteButtonText || "Delete"}
              handleClick={deleteButtonClick}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
