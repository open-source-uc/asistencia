import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const links = [
  {
    label: "Perfil",
    path: "/",
  },
  {
    label: "Organizaciones",
    path: "/orgs",
  },
  {
    label: "Nueva Organización",
    path: "/orgs/new",
  },
];

export function Sidebar({ className }: { className?: string }) {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground max-w-2xs min-h-screen py-6",
        className
      )}
    >
      <Button
        className="mb-2 px-4 text-2xl font-semibold tracking-tight w-full justify-start"
        variant={"noshadow"}
      >
        Attendance UC
      </Button>
      <div className="space-y-1">
        {links.map((link) => (
          <Button
            key={link.label}
            variant="ghost"
            className="w-full justify-start py-6"
            onClick={() => {
              navigate(link.path);
            }}
          >
            {link.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
