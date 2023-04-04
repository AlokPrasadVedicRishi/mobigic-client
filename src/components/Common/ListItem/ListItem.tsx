import React, { useState } from "react";
import "../../styles/list-item.css";

interface Props {
  id?: number | string; //unique number for id
  titleText?: string; //Title of the list item
  metaText?: string; //Second title/meta text for list
  children?: React.ReactNode; //Passing a react component here or div elements
  listStyle?: object; //style object for the list item as props
  handleClick?: () => void; //Onclick event handler of the button element
  metaTextStyle?: object; //style object for the meta text as props
  backgroundColor?: string;
}

//Common List view  Component
export const ListItem: React.FC<Props> = ({
  titleText,
  metaText,
  children,
  listStyle,
  handleClick,
  id,
  metaTextStyle,
  backgroundColor,
}) => {
  // stores the background id of hovered element
  const [backgroundID, setBackgroundID] = useState<any>(null);

  // used to change the background of the list item
  const toggleBackground = (bkId: any) => {
    if (handleClick) {
      setBackgroundID(bkId);
    }
  };

  return (
    //   if there is a style object in props then apply else default style
    <button
      key={"list" + id}
      id={
        id?.toString() ? "list-parent-container-" + id : "list-parent-container"
      }
      //   if there is a class style  in props then apply else default class
      className={`list-main-container ${
        backgroundID === id ? "list-item-bg" : ""
      }`}
      style={listStyle ? listStyle : {}}
    >
      <div
        className="image-text-container"
        // onclick function - if handleClick is present then calls the function or calls empty function
        onClick={handleClick ? handleClick : () => {}}
        id={id?.toString() ? "list-element" + id : "list-element"}
        onMouseOver={() => toggleBackground(id)}
        onMouseLeave={() => toggleBackground(null)}
      >
        {/* display image for the list item  if the image prop has value else no display*/}

        <div
          className="list-image-container"
          id="image-element"
          style={backgroundColor ? { backgroundColor: backgroundColor } : {}}
        >
          <p>{titleText?.charAt(0).toUpperCase()}</p>
        </div>
        {/* Mapping the text for list items */}
        <div className="text-container">
          <h4
            className="title-text"
            id={id?.toString() ? "title-text-" + id : "title-text"}
          >
            {titleText}
          </h4>
          {metaText ? (
            <p
              className="meta-text"
              id={id?.toString() ? "meta-text-" + id : "meta-text"}
              style={metaTextStyle ? metaTextStyle : {}}
            >
              {metaText}
            </p>
          ) : null}
        </div>
      </div>
      {/* Pass the children as child of the list view component being called in the file */}
      <div className="children-container">{children}</div>
    </button>
  );
};
