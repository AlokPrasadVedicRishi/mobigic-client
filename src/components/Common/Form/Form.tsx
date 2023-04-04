import React from "react";
import "../../styles/form.css";

interface Props {
  formStyle?: object; //Style object for form
  formClass?: string; //Class props for the main form container
  children: React.ReactNode; //Passing a react component here or div elements
}

//Common Form Component
export const Form: React.FC<Props> = ({ formStyle, formClass, children }) => {
  return (
    // Form container parent
    <div id="form" className="form-container">
      {/* Form Component Container */}
      <div
        id="form-children"
        className={`form-children ${formClass ? formClass : ""}`}
        style={formStyle ? formStyle : {}}
      >
        {/* Form Children Container */}
        <div className="form-child-container" id="form-child-container">
          {children}
        </div>
      </div>
    </div>
  );
};
