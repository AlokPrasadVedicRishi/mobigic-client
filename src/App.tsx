import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { ToastMessagesContext } from "./contexts/ToastMessages";
import { LoadingContextProvider } from "./contexts/Loading";

import "./App.css";
import { SignUp } from "./components/SignUp/SignUp";
import { Navbar } from "./components/Common/Navbar/Navbar";
import { SignIn } from "./components/SignIn/SignIn";
import { ListUserFiles } from "./components/ListFiles";
import { UserContextProvider } from "./contexts/User";
import { Upload } from "./components/UploadFiles";
import { FilesContextProvider } from "./contexts/Files";

const App: React.FC = () => {
  // check the existence of token
  const token: string | null = localStorage.getItem(
    "MOBIGIC-file-handling:token"
  );

  // if token is available, add it to headers of all requests
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return (
    // Provide the loading and user context to all routes
    <LoadingContextProvider>
      <UserContextProvider>
        <FilesContextProvider>
          <AppWithErrorBoundary />
        </FilesContextProvider>
      </UserContextProvider>
    </LoadingContextProvider>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    //
  }

  render() {
    if ((this.state as { hasError: boolean }).hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h3>Psst! Something's not right!</h3>
          <p>Please reload to continue</p>
        </div>
      );
    }

    return (this.props as any).children;
  }
}

const AppWithErrorBoundary: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppWithToastMessages />
    </ErrorBoundary>
  );
};

const AppWithToastMessages: React.FC = () => {
  // Get the state property form the ToastMessages reducer
  const { state } = useContext(ToastMessagesContext);
  useEffect(() => {
    if (state.message?.success) {
      toast.success(state.message.message);
    }
    if (!state.message?.success) {
      toast.error(state.message?.message);
    }
  }, [state]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Navbar />
        <Routes>
          <Route path="" element={<ListUserFiles />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
