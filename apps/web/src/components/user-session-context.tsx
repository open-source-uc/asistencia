import React, { createContext, useState } from "react";

export interface UserSession {
  id: string;
  email: string;
  access_token: string;
  isLoggedIn: boolean;
}

const initialState: UserSession = {
  id: "",
  email: "",
  access_token: "",
  isLoggedIn: false,
};

export interface UserSessionContextProps {
  userSession: UserSession;
  setUserSession: React.Dispatch<React.SetStateAction<UserSession>>;
}

export const UserSessionContext = createContext<UserSessionContextProps>({
  userSession: initialState,
  setUserSession: () => {},
});

export const UserSessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userSession, setUserSession] = useState<UserSession>(initialState);

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
