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

  const {
    logInRequest,
    signUpRequest,
    forgotPasswordRequest,
    editUserRequest,
  } = useUserSessionRequests();

  const logIn = async (email: string, password: string) => {
    try {
      const userSession = await logInRequest(email, password);
      setUserSession(userSession);
      toast({
        title: "Bienvenido",
        description: "Has iniciado sesión correctamente.",
        variant: "success",
      });
    } catch (e) {
      toast({
        title: "Error",
        description:
          "No se pudo iniciar sesión. Verifica que tus credenciales sean correctas.",
        variant: "destructive",
      });
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const userSession = await signUpRequest(email, password);
      setUserSession(userSession);
      toast({
        title: "Bienvenido",
        description: "Te has registrado correctamente.",
        variant: "success",
      });
    } catch (e) {
      toast({
        title: "Error",
        description:
          "No se pudo registrar. Verifica que tus credenciales sean correctas.",
        variant: "destructive",
      });
    }
  };

  const logOut = () => {
    setUserSession(initialStateUserSession);
  };

  const forgotPassword = async (email: string) => {
    try {
      await forgotPasswordRequest(email);
      toast({
        title: "Recuperación de contraseña",
        description: "Se ha enviado un correo para recuperar tu contraseña.",
        variant: "success",
      });
    } catch (e) {
      toast({
        title: "Error",
        description:
          "No se pudo enviar el correo para recuperar tu contraseña.",
        variant: "destructive",
      });
    }
  };

  const editUser = async (body: UserEdit) => {
    try {
      await editUserRequest(body);
      toast({
        title: "Actualizado",
        description: "Se ha actualizado tu información correctamente.",
        variant: "success",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "No se pudo actualizar tu información.",
        variant: "destructive",
      });
    }
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

const useUserSessionRequests = () => {
  const logInRequest = async (email: string, password: string) => {
    const res = await client.post(`/users/sign_in`, {
      user: {
        email,
        password,
      },
    });
    const user = res.data;
    const userSession = {
      id: user.id,
      email: user.email,
      access_token: user.authentication_token,
      isLoggedIn: true,
    };
    return userSession;
  };

  const signUpRequest = async (email: string, password: string) => {
    const res = await client.post(`/users`, {
      user: {
        email,
        password,
        password_confirmation: password,
      },
    });
    const user = res.data;
    const userSession = {
      id: user.id,
      email: user.email,
      access_token: user.authentication_token,
      isLoggedIn: true,
    };
    return userSession;
  };

  const forgotPasswordRequest = async (email: string) => {
    await client
      .post(`/users/password`, {
        user: {
          email,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  const editUserRequest = async (body: UserEdit) => {
    const res = await client.patch(`/users/me`, {
      user: {
        password: body.password,
        password_confirmation: body.password,
      },
    });
    return res.data;
  };

  return {
    logInRequest,
    signUpRequest,
    forgotPasswordRequest,
    editUserRequest,
  };
};
