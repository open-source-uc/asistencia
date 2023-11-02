import { useContext } from "react";
import {
  initialStateUserSession,
  UserSessionContext,
  UserSession,
  User,
} from "@/components/auth/user-session-context";
import axios from "axios";

interface UserEdit {
  email?: string;
  password?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_verified?: boolean;
}

export const useUserSession = (): {
  userSession: UserSession;
  setUserSession: (userSession: UserSession) => void;
  logOut: () => void;
  logIn: (email: string, password: string) => Promise<unknown>;
  signUp: (email: string, password: string) => Promise<unknown>;
  editUser: (body: UserEdit) => Promise<unknown>;
  forgotPassword: (email: string) => Promise<unknown>;
  resetPassword: (
    newPassword: string,
    forgotPasswordToken: string
  ) => Promise<unknown>;
} => {
  const { userSession, setUserSession } = useContext(UserSessionContext);

  const logIn = async (email: string, password: string) => {
    return axios
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
      .then(async (response) => {
        const userData = await getUser(response.data.access_token);
        if (userData !== null) {
          const userSession = {
            id: userData.id,
            email: userData.email,
            is_active: userData.is_active,
            is_superuser: userData.is_superuser,
            is_verified: userData.is_verified,
            access_token: response.data.access_token,
            isLoggedIn: true,
          };
          console.log(userSession);
          setUserSession(userSession);
        }
      });
  };

  const signUp = async (email: string, password: string) => {
    return axios
      .post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.detail) {
          console.log(res.data.detail);
        } else {
          logIn(email, password);
        }
      });
  };

  const logOut = () => {
    setUserSession(initialStateUserSession);
  };

  // https://fastapi-users.github.io/fastapi-users/10.1/usage/routes/

  const forgotPassword = async (email: string) => {
    return axios
      .post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        email,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const resetPassword = async (
    newPassword: string,
    forgotPasswordToken: string
  ) => {
    return axios
      .post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        token: forgotPasswordToken,
        password: newPassword,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const getUser = async (access_token: string): Promise<User | null> => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!res.data) return null;
    return res.data;
  };

  const editUser = async (body: UserEdit) => {
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/me`,
      body,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userSession.access_token}`,
        },
      }
    );
    if (!res.data) return null;
    setUserSession({
      ...userSession,
      email: res.data.email,
      is_active: res.data.is_active,
      is_superuser: res.data.is_superuser,
      is_verified: res.data.is_verified,
    });
  };

  // const requestVerifyToken = async (email: string) => {
  //   return (
  //     await axios.post(
  //       `${import.meta.env.VITE_API_URL}/auth/request-verify-token`,
  //       {
  //         email,
  //       }
  //     )
  //   ).data;
  // };

  // const verifyToken = async (token: string) => {
  //   return (
  //     await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify`, {
  //       token,
  //     })
  //   ).data;
  // };

  return {
    userSession,
    setUserSession,
    logOut,
    logIn,
    signUp,
    editUser,
    forgotPassword,
    resetPassword,
  };
};

export const useSuperUser= (
  access_token: string
): {
  getUser: (userId: string) => Promise<unknown>;
  editUser: (userId: string, body: UserEdit) => Promise<unknown>;
  deleteUser: (userId: string) => Promise<unknown>;
} => {
  const authHeaders = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  const getUser = async (userId: string) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${userId}`,
      authHeaders
    );
    if (!res.data) return null;
    return res.data;
  };
  const editUser = async (userId: string, body: UserEdit) => {
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/${userId}`,
      body,
      authHeaders
    );
    if (!res.data) return null;
    return res.data;
  };
  const deleteUser = async (userId: string) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/users/${userId}`,
      authHeaders
    );
    if (!res.data) return null;
    return res.data;
  };
  return { getUser, editUser, deleteUser };
};
