import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import { BARTABS } from "@/constants/barTabs";
import { LogOutIcon } from "lucide-react";
import { useUserSession } from "@/hooks/useUserSession";

export function Sidebar({ className }: { className?: string }) {
  const navigate = useNavigate();
  const { logOut } = useUserSession();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={className}>
      <div className={cn(isOpen ? "w-64" : "w-16", "min-h-screen")}></div>
      <div
        className={cn(
          isOpen ? "w-96" : "w-16",
          "fixed bg-primary text-primary-foreground max-w-2xs min-h-screen py-6"
        )}
      >
        <div className="flex flex-row flex-start items-center mb-2">
          <Button
            variant={"ghost"}
            className="rounded-full ml-2 p-2"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <MenuIcon />
          </Button>
          {isOpen && (
            <Button
              className="px-4 text-2xl font-semibold tracking-tight w-full justify-start"
              variant={"noshadow"}
              onClick={() => {
                navigate("/");
              }}
            >
              AttendanceUC
            </Button>
          )}
        </div>
        <div className="space-y-1">
          {BARTABS.map((link, i) => (
            <Button
              key={i}
              variant="ghost"
              className="w-full justify-start py-6"
              onClick={() => {
                navigate(link.path);
              }}
            >
              <link.icon />
              {isOpen && <span className="ml-6">{link.name}</span>}
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start py-6 text-red-500 bottom-0 absolute hover:bg-red-500 hover:text-white"
          onClick={() => {
            logOut();
            navigate("/");
          }}
        >
          <LogOutIcon />
          {isOpen && <span className="ml-6">Cerrar Sesión</span>}
        </Button>
      </div>
    </div>
  );
}
