import { createContext } from "react";

const CurrentUserContext = createContext({
  currentUser: null,
  loggedIn: false,
  isAuthChecking: true,
  onLogout: () => {},
});

export default CurrentUserContext;
