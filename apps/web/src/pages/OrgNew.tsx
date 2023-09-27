import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OrgNew(): JSX.Element {
  return (
    <div className="space-y-6 flex flex-col items-center w-full px-16 max-w-xl">
      Hay que cambiar o mover esto pq está muy raro
      <h2 className="text-3xl font-bold text-center">Nueva Organización</h2>
      <Input variant={"rounded"} placeholder="Nombre de la organización" />
      <Button variant={"rounded"} className="w-full">
        Crear
      </Button>
    </div>
  );
}
