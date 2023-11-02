import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserSession } from "@/hooks/useUserSession";

export default function RecoverPassword() {
  const { forgotPassword } = useUserSession();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleSubmit = () => {
    setIsLoading(true);
    forgotPassword(email)
      .then(() => {
        setIsLoading(false);
        setError("");
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        setError("Ocurrió un error al enviar el correo electrónico");
      });
  };
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Reestablecer contraseña</h2>
      <span>
        Ingrese su dirección de correo electrónico y le enviaremos un enlace
        para restablecer su contraseña.
      </span>
      <Input
        type="email"
        placeholder="Correo electrónico"
        className="mt-4"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Button
        className="mt-4 w-32"
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Enviar
      </Button>
      <span className="text-sm text-red-500 mt-4">{error}</span>
    </div>
  );
}
