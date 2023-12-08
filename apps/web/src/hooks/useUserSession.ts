import { useContext } from "react";
import {
  UserSessionContext,
  UserSession,
} from "@/components/contexts/user-session-context";
import { initialStateUserSession } from "@/components/contexts/user-session-storage";
import client from "@/api/client";
import { useToast } from "@/components/ui/use-toast";

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
} => {
  const { userSession, setUserSession } = useContext(UserSessionContext);
  const { toast } = useToast();

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
        toast({
          title: "Bienvenido",
          description: "Has iniciado sesión correctamente.",
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description:
            "No se pudo iniciar sesión. Verifica que tus credenciales sean correctas.",
          variant: "destructive",
        });
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
      .then((response) => {
        const userSession = {
          id: response.data.id,
          email: response.data.email,
          access_token: response.data.authentication_token,
          isLoggedIn: true,
        };
        setUserSession(userSession);
        toast({
          title: "Bienvenido",
          description: "Te has registrado correctamente.",
          variant: "success",
        });
      });
  };

  const logOut = () => {
    setUserSession(initialStateUserSession);
  };

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

  const editUser = async (body: UserEdit) => {
    return client
      .patch(`/users/password`, {
        user: {
          ...body,
        },
      })
      .then((res) => {
        console.log(res);
        toast({
          title: "Actualizado",
          description: "Se ha actualizado tu información correctamente.",
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: "No se pudo actualizar tu información.",
          variant: "destructive",
        });
      });
  };

  return {
    userSession,
    setUserSession,
    logOut,
    logIn,
    signUp,
    editUser,
    forgotPassword,
  };
};
