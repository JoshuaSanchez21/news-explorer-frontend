import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ProtectedRoute({ children, onLoginClick }) {
  const { loggedIn, isAuthChecking } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!isAuthChecking && !loggedIn) {
      onLoginClick();
    }
  }, [isAuthChecking, loggedIn, onLoginClick]);

  if (isAuthChecking) {
    return null;
  }

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
