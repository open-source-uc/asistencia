import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { CogIcon, BookMarkedIcon, BookPlusIcon, MenuIcon } from "lucide-react";

const links = [
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

export function Sidebar({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <>
      <div className={cn(dropdownOpen ? "w-96" : "w-16", "min-h-screen")}></div>
      <div
        className={cn(
          dropdownOpen ? "w-96" : "w-16",
          "fixed bg-primary text-primary-foreground max-w-2xs min-h-screen py-6",
          className
        )}
      >
        <div className="flex flex-row flex-start items-center mb-4 mb-2">
          <Button
            variant={"ghost"}
            className="rounded-full ml-2 p-2"
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
            }}
          >
            <MenuIcon />
          </Button>
          {dropdownOpen && (
            <Button
              className="px-4 text-2xl font-semibold tracking-tight w-full justify-start"
              variant={"noshadow"}
              onClick={() => {
                navigate("/");
              }}
            >
              Attendance UC
            </Button>
          )}
        </div>
        <div className="space-y-1">
          {links.map((link, i) => (
            <Button
              key={i}
              variant="ghost"
              className="w-full justify-start py-6"
              onClick={() => {
                navigate(link.path);
              }}
            >
              <link.icon />
              {dropdownOpen && <span className="ml-6">{link.name}</span>}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
