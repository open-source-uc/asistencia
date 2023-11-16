import { UserSession } from "./user-session-context";

export const initialStateUserSession: UserSession = {
  id: "",
  email: "",
  access_token: "",
  is_active: false,
  is_superuser: false,
  is_verified: false,
  isLoggedIn: false,
};

export const setUserSessionStorage = (userSession: UserSession) => {
  sessionStorage.setItem("userSession", JSON.stringify(userSession));
};

export const getUserSessionStorage = (): UserSession => {
  const userSessionStr = sessionStorage.getItem("userSession");
  if (userSessionStr === null) {
    return initialStateUserSession;
  }
  return JSON.parse(userSessionStr);
};

export const removeUserSessionStorage = () => {
  sessionStorage.removeItem("userSession");
};
