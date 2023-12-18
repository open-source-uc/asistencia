import React, { createContext, useEffect, useState } from "react";
import {
  getUserSessionStorage,
  setUserSessionStorage,
  removeUserSessionStorage,
} from "./user-session-storage";

export interface User {
  id: string;
  email: string;
}

export interface UserSession extends User {
  access_token: string;
  isLoggedIn: boolean;
}

export interface UserSessionContextProps {
  userSession: UserSession;
  setUserSession: React.Dispatch<React.SetStateAction<UserSession>>;
}

export const UserSessionContext = createContext<UserSessionContextProps>({
  userSession: getUserSessionStorage(),
  setUserSession: () => {},
});

export const UserSessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState = getUserSessionStorage();
  const [userSession, setUserSession] = useState<UserSession>(initialState);

  useEffect(() => {
    if (userSession.isLoggedIn) {
      setUserSessionStorage(userSession);
    } else {
      removeUserSessionStorage();
    }
  }, [userSession]);

  return (
    <UserSessionContext.Provider
      value={{
        userSession,
        setUserSession,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};
