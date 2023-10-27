/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";

export interface OrgField {
  name: string;
  code: string;
  year: number;
  semester: string;
  section: string;
}

export interface Org extends OrgField {
  id: string;
  enabled: boolean;
}

export const useOrgs = (): {
  orgs: Org[];
  isLoading: boolean;
} => {
  const { getOrgs } = requestOrgs();
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

// export const useOrg = (
//   orgId: string | undefined
// ): { org: Org | null; isLoading: boolean } => {
//   const { getOrgById } = requestOrgs();
//   const [isLoading, setIsLoading] = useState(false);
//   const [org, setOrg] = useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       if (orgId) {
//         setIsLoading(true);
//         const data = await getOrgById(orgId);
//         setOrg(data);
//         setIsLoading(false);
//       }
//       console.log("request2");
//     };
//     fetchData();
//   }, [orgId]);
//   return { org, isLoading };
// };

export const requestOrgs = (): {
  getOrgs: () => Promise<any>;
  // getOrgById: (id: string) => Promise<any>;
  createOrg: (values: OrgField) => Promise<any>;
} => {
  const getOrgs = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/`, {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  };

  // const getOrgById = async (id: string) => {
  //   const res = await axios.get(
  //     `${import.meta.env.VITE_API_URL}/courses/${id}`
  //   );
  //   return res.data;
  // };

  const createOrg = async (values: OrgField) => {
    return await axios
      .post(
        `${import.meta.env.VITE_API_URL}/courses/`,
        {
          ...values,
          enabled: true,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { createOrg, getOrgs };
};
