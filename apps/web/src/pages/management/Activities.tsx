import { Button } from "@/components/ui/button";

export default function Activities(): JSX.Element {
  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      <h2 className="text-2xl font-bold text-center">
        IIC3585-1 Diseño Avanzado de Aplicaciones Web
      </h2>
      <hr className="w-3/4 border-input border-1" />
      <Button>Click me</Button>
    </div>
  );
}
