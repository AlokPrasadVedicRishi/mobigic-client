import "../../styles/header.css";
import backButton from "../../../assets/images/back_icon.svg";

export interface IHeaderProps {
  showBackButton?: boolean; // If true only then shows the back button else not
  handleBackClick?: () => void; // handle the action when back button is clicked
  headerTitle: string; // Title of the header to be shown
}

// Used to show header at the top of the screen
export const Header: React.FC<IHeaderProps> = ({
  showBackButton,
  headerTitle,
  handleBackClick,
}) => {
  return (
    <div className="header" id="header">
      <div>
        {/* if back button is set as true only then shows the back button */}
        {showBackButton && (
          <div
            className="back-button-container"
            id="back-button-click"
            onClick={handleBackClick ? handleBackClick : () => {}}
          >
            <img src={backButton} id="header-back-button" alt="back-button" />
          </div>
        )}
        {/* if back button is not present then adds a class to provide margin left */}
        <p id="header-title" className={!showBackButton ? "ml-16" : ""}>
          {headerTitle || ""}
        </p>
      </div>
    </div>
  );
};
