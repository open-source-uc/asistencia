/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import client from "@/api/client";
import type { Message } from "@/types/interfaces";
import { UserType } from "@/types/enums";
import { useToast } from "@/components/ui/use-toast";

export interface OrgField {
  name: string;
  slug: string;
}

export interface Org extends OrgField {
  id: string;
  enabled: boolean;
}

export const useOrgs = (): {
  orgs: Org[];
  isLoading: boolean;
  deleteOrg: (orgSlug: string) => Promise<void>;
} => {
  const { getOrgs, deleteOrg: deleteOrgHandler } = useHandlerOrgs();
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getOrgs();
      setOrgs(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const deleteOrg = async (orgSlug: string) => {
    await deleteOrgHandler(orgSlug).then(() =>
      setOrgs(orgs.filter((org) => org.slug !== orgSlug))
    );
  };
  return { orgs, isLoading, deleteOrg };
};

export const useHandlerOrgs = (): {
  getOrgs: () => Promise<any>;
  createOrg: (values: OrgField) => Promise<any>;
  deleteOrg: (orgSlug: string) => Promise<any>;
} => {
  const { toast } = useToast();
  const getOrgs = async () => {
    try {
      const res = await client.get(`/api/v1/courses/`);
      return res.data.courses;
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  const createOrg = async (values: OrgField) => {
    return await client
      .post(`/api/v1/courses/`, {
        ...values,
        enabled: true,
      })
      .then(() => {
        toast({
          title: "Organización creada",
          description: "La organización se ha creado correctamente.",
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error al crear la organización",
          description: "Ha ocurrido un error al crear la organización.",
          variant: "destructive",
        });
      });
  };

  const deleteOrg = async (orgSlug: string) => {
    return await client.delete(`/api/v1/courses/${orgSlug}`).catch((error) => {
      console.log(error);
    });
  };

  return { createOrg, getOrgs, deleteOrg };
};

export const useOrg = (
  slug: string | undefined = ""
): {
  org: Org;
  userType: UserType;
  isLoading: boolean;
} => {
  const [org, setOrg] = useState<Org>({
    id: "",
    name: "",
    slug: "",
    enabled: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>(UserType.VIEWER);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await client.get(`/api/v1/courses/${slug}`);
      getMe();
      setOrg(res.data.course);
      setIsLoading(false);
    };
    fetchData();
  }, [slug]);

  const getMe = async () => {
    return await client
      .get(`/api/v1/courses/${slug}/user_courses/me`)
      .then((res) => {
        setUserType(
          UserType[
            Object.keys(res.data)
              .find((key) => res.data[key].length > 0)
              ?.toUpperCase() as keyof typeof UserType
          ] || UserType.VIEWER
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { org, userType, isLoading };
};
