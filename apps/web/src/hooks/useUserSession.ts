import { useContext } from "react";
import {
  UserSessionContext,
  UserSession,
} from "@/components/contexts/user-session-context";
import { initialStateUserSession } from "@/components/contexts/user-session-storage";
import client from "@/api/client";

interface UserEdit {
  email?: string;
  password?: string;
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
    return client
      .post(`/users/sign_in`, {
        user: {
          email,
          password,
        },
      })
      .then(async (response) => {
        const userSession = {
          id: response.data.id,
          email: response.data.email,
          access_token: response.data.authentication_token,
          isLoggedIn: true,
        };
        setUserSession(userSession);
      });
  };

  const signUp = async (email: string, password: string) => {
    return client
      .post(`/users`, {
        user: {
          email,
          password,
          password_confirmation: password,
        },
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
    return client
      .post(`/users/password`, {
        user: {
          email,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  const resetPassword = async (
    newPassword: string,
    forgotPasswordToken: string
  ) => {
    return client
      .post(`/auth/reset-password`, {
        token: forgotPasswordToken,
        password: newPassword,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const editUser = async (body: UserEdit) => {
    const res = await client.patch(`/users/me`, body);
    if (!res.data) return null;
    setUserSession({
      ...userSession,
      email: res.data.email,
    });
  };

  // const requestVerifyToken = async (email: string) => {
  //   return (
  //     await client.post(`/auth/request-verify-token`, {
  //       email,
  //     })
  //   ).data;
  // };

  // const verifyToken = async (token: string) => {
  //   return (
  //     await client.post(`/auth/verify`, {
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

export const useSuperUser = (): {
  getUser: (userId: string) => Promise<unknown>;
  editUser: (userId: string, body: UserEdit) => Promise<unknown>;
  deleteUser: (userId: string) => Promise<unknown>;
} => {
  const getUser = async (userId: string) => {
    const res = await client.get(`/users/${userId}`);
    if (!res.data) return null;
    return res.data;
  };
  const editUser = async (userId: string, body: UserEdit) => {
    const res = await client.patch(`/users/${userId}`, body);
    if (!res.data) return null;
    return res.data;
  };
  const deleteUser = async (userId: string) => {
    const res = await client.delete(`/users/${userId}`);
    if (!res.data) return null;
    return res.data;
  };
  return { getUser, editUser, deleteUser };
};
