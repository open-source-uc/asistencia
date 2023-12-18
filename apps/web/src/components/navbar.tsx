import { useState, useRef } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import { BARTABS } from "@/lib/constants/barTabs";

export function NavBar({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  useOnClickOutside(navRef, () => setIsOpen(false));
  return (
    <div className={className} ref={navRef}>
      <div
        className={cn(
          isOpen ? "h-56" : "h-16",
          "fixed bg-primary text-primary-foreground w-full flex flex-col justify-start items-start py-3 shadow-md z-10 overflow-hidden"
        )}
      >
        <div className="flex flex-row justify-start items-center w-full">
          <Button
            variant={"ghost"}
            className="rounded-full ml-4 p-2"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <MenuIcon />
          </Button>
          <Button
            className="px-4 text-2xl font-semibold tracking-tight px-6"
            variant={"noshadow"}
            onClick={() => {
              navigate("/");
            }}
          >
            AttendanceUC
          </Button>
        </div>
        <div className="space-y-2 pt-3 w-full">
          {BARTABS.map((link, i) => (
            <Button
              key={i}
              variant="ghost"
              className="w-full justify-start py-6 px-6"
              onClick={() => {
                navigate(link.path);
              }}
            >
              <link.icon />
              {isOpen && <span className="ml-6">{link.name}</span>}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
