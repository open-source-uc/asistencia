/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";

export interface OrgField {
  name: string;
}

export interface Org extends OrgField {
  id: string;
  enabled: boolean;
}

export const useOrgs = (
  authToken: string
): {
  orgs: Org[];
  isLoading: boolean;
} => {
  const { getOrgs } = handlerOrgs(authToken);
  const [orgs, setOrgs] = useState([]);
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
  return { orgs, isLoading };
};

export const handlerOrgs = (
  authToken: string
): {
  getOrgs: () => Promise<any>;
  createOrg: (values: OrgField) => Promise<any>;
} => {
  const getOrgs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  const createOrg = async (values: OrgField) => {
    return await axios
      .post(
        `${import.meta.env.VITE_API_URL}/courses/`,
        {
          ...values,
          archived: false,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .catch((err) => {
        console.log(err);
      });
  };

  return { createOrg, getOrgs };
};
