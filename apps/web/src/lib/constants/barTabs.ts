import { CogIcon, BookMarkedIcon, BookPlusIcon } from "lucide-react";
import React from "react";

type BarTab = {
  name: string;
  icon: React.FC;
  path: string;
};

export const BARTABS: BarTab[] = [
  {
    name: "Organizaciones",
    icon: BookMarkedIcon,
    path: "/orgs",
  },
  {
    name: "Nueva Organización",
    icon: BookPlusIcon,
    path: "/orgs/new",
  },
  {
    name: "Configuración",
    icon: CogIcon,
    path: "/settings",
  },
];
