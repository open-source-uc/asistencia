import React, { createContext, useState } from "react";

export interface UserSession {
  name: string;
  email: string;
  token: string;
  isValid: boolean;
}

export interface UserSessionContextProps {
  userSession: UserSession;
  setUserSession: React.Dispatch<React.SetStateAction<UserSession>>;
}

export const UserSessionContext = createContext<UserSessionContextProps>({
  userSession: {
    name: "",
    email: "",
    token: "",
    isValid: false,
  },
  setUserSession: () => {},
});

export const UserSessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userSession, setUserSession] = useState<UserSession>({
    name: "",
    email: "",
    token: "",
    isValid: false,
  });

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
