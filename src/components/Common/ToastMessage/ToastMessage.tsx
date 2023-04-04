// Usage
/**
 * message?<ToastMessage message={message} time={2000}/>:null
 * Message can be a state value, reducer value or any other string. But after the time has passed
 * unmount the component.
 * MAKE USE OF TERNARY OPERATOR TO MOUNT THE COMPONENT
 */
import React, { useState, useEffect } from "react";

//Props interface. Defines all the required props by the component
interface IProps {
  message: string; //message for the user to see
  time?: number; //time till the snackbar will be visible - default (1.5 seconds)
}

export const ToastMessage: React.FC<IProps> = ({ message, time = 4000 }) => {
  // Stores the class name value for the snackbar toast message to be visible
  const [snackbar, setSnackBar] = useState<string>("show");
  //After the component mounts
  useEffect(() => {
    //   If there is a timeout from the user then after that time out hide the snack bar message
    setTimeout(() => {
      // Set snackbar to empty
      setSnackBar("");
    }, time);
  }, []);
  return (
    // Parent container for toast message
    <div
      id="snackbar-container"
      className={`snackbar-parent ${snackbar || ""}`}
    >
      <div id="snackbar" className={`snackbar-content`}>
        {/* Mapping the original message in the snack bar */}
        {message}
      </div>
    </div>
  );
};
