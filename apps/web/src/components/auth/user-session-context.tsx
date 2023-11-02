import React, { createContext, useState } from "react";

export interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}

export interface UserSession extends User {
  access_token: string;
  isLoggedIn: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const initialStateUserSession: UserSession = {
  id: "",
  email: "",
  access_token: "",
  is_active: false,
  is_superuser: false,
  is_verified: false,
  isLoggedIn: false,
};

export interface UserSessionContextProps {
  userSession: UserSession;
  setUserSession: React.Dispatch<React.SetStateAction<UserSession>>;
}

export const UserSessionContext = createContext<UserSessionContextProps>({
  userSession: initialStateUserSession,
  setUserSession: () => {},
});

export const UserSessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userSession, setUserSession] = useState<UserSession>(initialStateUserSession);

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
