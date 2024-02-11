import { useOrgsQuery, useOrgsMutations } from "./queries/useOrgs";
import { useToast } from "@/components/ui/use-toast";
import type { Org } from "@/types/interfaces";

export const useOrgs = () => {
  const { toast } = useToast();

  const orgs = useOrgsQuery();

  const getOrgs = (): Org[] => {
    return orgs.data || [];
  };

  const orgsMutations = useOrgsMutations();

  const { createOrg: createOrgMutation, deleteOrg: deleteOrgMutation } =
    orgsMutations;

  const createOrg = ({ name, slug }: { name: string; slug: string }) => {
    createOrgMutation.mutateAsync(
      {
        name,
        slug,
      },
      {
        onError: () => {
          toast({
            title: "Error al agregar organización",
            description: "Ha ocurrido un error inesperado.",
            variant: "destructive",
          });
        },
        onSuccess: () => {
          toast({
            title: "Organización agregada",
            description: "La organización ha sido agregada correctamente.",
            variant: "success",
          });
        },
      }
    );
  };

  const deleteOrg = (orgSlug: string) => {
    deleteOrgMutation.mutateAsync(orgSlug, {
      onError: () => {
        toast({
          title: "Error al eliminar organización",
          description: "Ha ocurrido un error inesperado.",
          variant: "destructive",
        });
      },
      onSuccess: () => {
        toast({
          title: "Organización eliminada",
          description: "La organización ha sido eliminada correctamente.",
          variant: "success",
        });
      },
    });
  };

  return {
    orgs,
    orgsMutations,
    getOrgs,
    createOrg,
    deleteOrg,
  };
};
