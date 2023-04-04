/* eslint-disable no-unused-expressions */

import React, { useState } from "react";
import "../../styles/text-field.css";
import Eye from "../../../assets/icons/eyeVisibility.svg";
import EyeClosed from "../../../assets/icons/eyeClosed.png";

interface Props {
  value: string | number | readonly string[] | undefined;
  placeholder: string;
  textFieldStyle?: object;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type?: string; //Type of input field. By default, text
  id: string; //Id of the input field. Would be postfixed with _element
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void | undefined;
  onBlur?: () => void; //onBlur event handler
  disabled?: boolean; //if props say to disable the field then disable
  error?: string; // Error message for a text field (optional)
  width?: string; //Width props to provide width to the container
  minChar?: number | 20; //Props for min char of input default -20
  maxChar?: number | 20; //Props for max char of input default -20
  handleKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void; //onKeyPress event handler
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; //onKeyDown event handler
  onKeyUp?:
    | ((event: React.KeyboardEvent<HTMLInputElement>) => void)
    | (() => void); //onKeyUp event handler
  showEye?: boolean;
  visibility?: boolean;
  toggleVisibility?: any;
}

//Common TextField Component
export const TextField: React.FC<Props> = ({
  label,
  placeholder,
  handleChange,
  type,
  id,
  textFieldStyle,
  value,
  onFocus,
  onBlur,
  disabled,
  error,
  width,
  minChar,
  maxChar,
  handleKeyPress,
  onKeyDown,
  onKeyUp,
  showEye,
  visibility,
  toggleVisibility,
}) => {
  // Hook to declare the focus state of the field and the setter function
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <div className="main-container" style={width ? { width: width } : {}}>
      <label className="label" htmlFor={id + "_element"}>
        {label}
      </label>
      <div
        className={`text-field-container ${
          disabled
            ? " disabled"
            : error
            ? " error-input"
            : focus
            ? "text-field-container-focus"
            : ""
        }`}
      >
        <input
          value={value}
          id={id + "_element"}
          placeholder={placeholder}
          type={type ? type : "text"}
          className="input-text-field"
          // if there is a style prop then use the incoming styles
          style={textFieldStyle ? textFieldStyle : {}}
          onChange={handleChange}
          // Only if the props have disabled true then convert the field to disabled field
          disabled={disabled ? true : false}
          // Event to change border color when user has clicked on the field
          onFocus={onFocus ? onFocus : () => setFocus(true)}
          // Event to change border color when user has clicked outside the field field
          onBlur={onBlur ? onBlur : () => setFocus(false)}
          minLength={minChar} //minimum number of inputs
          maxLength={maxChar} //maximum number of inputs
          // on keyboard key press event handler function
          onKeyPress={handleKeyPress}
          // key up and key down keyboard events
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        />
        {showEye ? (
          <span className="eye-icon" onClick={toggleVisibility}>
            <img alt="eye" src={visibility ? EyeClosed : Eye}></img>
          </span>
        ) : null}
      </div>
      {/* Display the error message if any */}
      {error ? (
        <span
          className="input-error-message"
          id={"error-message" + id}
          key={error}
        >
          {error}
        </span>
      ) : null}
    </div>
  );
};
