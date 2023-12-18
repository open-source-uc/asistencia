import { type UserType } from "@/types/enums";

export const ASSISTANTS_ROLES: Record<UserType, string> = {
  admin: "Administrador",
  manager: "Gestor",
  viewer: "Espectador",
};
