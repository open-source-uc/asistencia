import { useContext } from "react";
import {
  UserSessionContext,
  UserSession,
} from "@/components/user-session-context";
import axios from "axios";

export const useUserSession = (): {
  userSession: UserSession;
  setUserSession: (userSession: UserSession) => void;
  logOut: () => void;
  logIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => Promise<unknown>;
} => {
  const { userSession, setUserSession } = useContext(UserSessionContext);
  const logIn = (email: string, password: string) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/auth/jwt/login`,
        {
          grant_type: "",
          username: email,
          password: password,
          scope: "",
          client_id: "",
          client_secret: "",
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUserSession({
          id: "",
          email: email,
          access_token: response.data.access_token,
          isLoggedIn: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUp = async (email: string, password: string) => {
    return axios
      .post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        email: email,
        password: password,
        is_active: true,
        is_superuser: false,
        is_verified: false,
      })
      .then((res) => {
        if (res.data.detail) {
          console.log(res.data.detail);
        } else {
          logIn(email, password);
        }
      })
  };

  const logOut = () => {
    setUserSession({
      id: "",
      email: "",
      access_token: "",
      isLoggedIn: false,
    });
  };

  return { userSession, setUserSession, logOut, logIn, signUp };
};
