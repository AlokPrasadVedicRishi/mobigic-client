import jwtDecode from "jwt-decode";

// user name validation method
export const isUserNameValid = (name: string) => {
  // returns true if the name is at least 8 characters long and consists of only alphabetical and numerical characters, else returns false
  return /^[A-Za-z0-9]{8,}$/.test(name);
};

//password validation method
export const isPasswordValid = (password: string) => {
  //return true if the length of the password is more than or equal to 8 characters else returns false
  return password.length >= 8;
};

// Function to check if an error is due to invalid token
export const isTokenInvalidError = (err: any) => {
  // If error is due to invalid token, send the user to the error page
  if (
    err?.response?.status === 401 ||
    err?.response?.status === 403 ||
    err?.response?.status === 406
  ) {
    window.location.href = "/sign-in";
  }
  return false;
};

// Function to validate JWT
export const isJWTValid = () => {
  // Get the token from local storage and check if it exists
  const token = localStorage.getItem("MOBIGIC-file-handling:token");
  if (!token) {
    throw new Error("No JWT available in the local storage");
  }

  // Decode the token
  const decodedToken: any = jwtDecode(token);
  if (decodedToken.id) {
    // Check if the token is still valid
    if (Date.now() >= decodedToken.exp * 1000) {
      throw new Error("Token has expired");
    }
    // If decoded token has the id, return it
    return decodedToken;
  } else {
    // Throw an error if the decoded token is invalid
    throw new Error("Unable to decode JWT");
  }
};
