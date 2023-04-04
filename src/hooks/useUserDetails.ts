// Hook for verifying if the user is logged in and if yes, returning the decoded JWT

import { isJWTValid } from "../helpers/validate";

// Decoded the JWT from the local storage and returns the decoded value or if the token is not valid or not present, it pushes the user to the / route
export default () => {
  try {
    return isJWTValid();
  } catch (err) {
    // Remove the token from local storage if exists
    localStorage.removeItem("MOBIGIC-file-handling:token");
    // Push the user to the / route in case of any errors
    window.location.href = "/sign-in";
    return;
  }
};
