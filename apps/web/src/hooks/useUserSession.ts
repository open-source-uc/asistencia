import { useContext } from "react";
import {
  UserSessionContext,
  UserSession,
} from "@/components/user-session-context";

export const useUserSession = (): {
  userSession: UserSession;
  setUserSession: (userSession: UserSession) => void;
} => {
  const { userSession, setUserSession } = useContext(UserSessionContext);
  return { userSession, setUserSession };
};
