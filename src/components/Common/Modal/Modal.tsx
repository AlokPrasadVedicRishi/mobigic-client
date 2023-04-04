import React from "react";
import "../../styles/modal.css";
import { Header } from "../Header/Header";

interface Props {
  modalStyle?: object; //Style object for modal
  modalClass?: string; //Class props for the main modal container
  children: React.ReactNode; //Passing a react component here or div elements
  showModal: boolean; //toggle modal props(mandatory)
  isFlexible?: boolean; // if true then makes the modal full device size in smaller devices else small with backdrop
  showHeader?: boolean; // if true then adds header at the top of the modal
  showBackButton?: boolean; // shows back button on the header if true else not
  headerTitle?: string; // shows the title of the modal and only when showHeader is true
  handleBackClick?: () => void; // handle the action when back button is clicked
}

//Common Modal Component
export const Modal: React.FC<Props> = ({
  modalStyle,
  modalClass,
  children,
  showModal,
  isFlexible,
  showHeader,
  showBackButton,
  headerTitle,
  handleBackClick,
}) => {
  return (
    // Modal container parent
    <div
      id="modal"
      className="modal-background"
      // based on props toggle the display of the modal
      style={showModal ? {} : { display: "none" }}
    >
      <div className="background-modal" id="click-blur"></div>
      <div
        id="modal-children"
        // based on props for style and class assign style and class to the container
        // adds flexible class when isFlexible is true which takes full screen on mobile and viewed as normal on desktop
        className={`modal-layout ${modalClass ? modalClass : ""} ${
          isFlexible ? "flexible" : ""
        }`}
        style={modalStyle ? modalStyle : {}}
      >
        {/* shows the header on the modal if showHeader true */}
        {showHeader && (
          <Header
            headerTitle={headerTitle || ""}
            showBackButton={showBackButton || false}
            handleBackClick={handleBackClick ? handleBackClick : () => {}}
          />
        )}
        <div className="modal-child-container" id="modal-child-container">
          {/* Mapping the children being passed as props */}
          {children}
        </div>
      </div>
    </div>
  );
};
