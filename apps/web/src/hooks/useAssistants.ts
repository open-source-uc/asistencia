import {
  useAssistantsQuery,
  useAssistantsMutations,
} from "./queries/useAssistants";
import { useToast } from "@/components/ui/use-toast";
import type { Assistant } from "@/types/interfaces";
import { UserType } from "@/types/enums";

export const useAssistants = (orgId: string = "") => {
  const { toast } = useToast();
  const assistants = useAssistantsQuery(orgId);

  const getAssistants = () => {
    return assistants.data || [];
  };

  const assistantsMutations = useAssistantsMutations(orgId);
  const {
    addAssistant: addAssistantMutation,
    addMultipleAssistants: addMultipleAssistantsMutation,
    removeAssistant: removeAssistantMutation,
    removeMultipleAssistants: removeMultipleAssistantsMutation,
  } = assistantsMutations;

  const addAssistant = (email: string, role: UserType = UserType.VIEWER) => {
    addAssistantMutation.mutateAsync(
      {
        email,
        role,
      },
      {
        onError: () => {
          toast({
            title: "Error",
            description: "Ha ocurrido un error inesperado al agregar ayudante.",
            variant: "destructive",
          });
        },
        onSuccess: () => {
          toast({
            title: "Ayudante agregado",
            description: "El ayudante ha sido agregado correctamente.",
            variant: "success",
          });
        },
      }
    );
  };
  const addMultipleAssistants = (
    emails: string[],
    role: UserType | undefined
  ) => {
    addMultipleAssistantsMutation.mutateAsync(
      {
        emails,
        role,
      },
      {
        onError: () => {
          toast({
            title: "Error",
            description: "Ha ocurrido un error al añadir los ayudantes.",
            variant: "destructive",
          });
        },
        onSuccess: () => {
          toast({
            title: "Ayudantes añadidos",
            description: "Los ayudantes han sido añadidos correctamente.",
            variant: "success",
          });
        },
      }
    );
  };

  const removeAssistant = (email: string, role: UserType = UserType.VIEWER) => {
    removeAssistantMutation.mutateAsync(
      {
        email,
        role,
      },
      {
        onError: () => {
          toast({
            title: "Error",
            description:
              "Ha ocurrido un error inesperado al remover el ayudante.",
            variant: "destructive",
          });
        },
        onSuccess: () => {
          toast({
            title: "Ayudante removido",
            description: "El ayudante ha sido removido correctamente.",
            variant: "success",
          });
        },
      }
    );
  };

  const removeMultipleAssistants = (users: Assistant[]) => {
    removeMultipleAssistantsMutation.mutateAsync(users, {
      onError: () => {
        toast({
          title: "Error al remover ayudantes",
          description: "Ha ocurrido un error al remover los asistentes.",
          variant: "destructive",
        });
      },
      onSuccess: () => {
        toast({
          title: "Ayudantes removidos de la organización",
          description: "Los ayudantes han sido removidos correctamente.",
          variant: "success",
        });
      },
    });
  };
  return {
    assistants,
    assistantsMutations,
    getAssistants,
    addAssistant,
    addMultipleAssistants,
    removeAssistant,
    removeMultipleAssistants,
  };
};
