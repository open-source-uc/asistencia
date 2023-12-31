import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/input-password";
import { useForm } from "react-hook-form";
import { useUserSession } from "@/hooks/useUserSession";

const formSchema = z.object({
  email: z.string().email("El correo debe ser válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

interface Field {
  name: "email" | "password";
  label: string;
  placeholder: string;
  type?: string;
  component: typeof Input | typeof InputPassword;
}

const FORM_FIELDS: Field[] = [
  {
    name: "email",
    label: "Correo",
    placeholder: "ejemplo@uc.cl",
    type: "email",
    component: Input,
  },
  {
    name: "password",
    label: "Contraseña",
    placeholder: "Mínimo 6 caracteres",
    component: InputPassword,
  },
];

export default function LoginForm() {
  const { logIn } = useUserSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    logIn(values.email, values.password).then(
      () => {
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.log(error);
        setError(
          "Ocurrió un error inesperado. Asegúrate de que tus credenciales sean correctas."
        );
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <span className="text-xl font-bold text-center mb-12">
          Iniciar Sesión
        </span>
        {FORM_FIELDS.map((form_field: Field, i: number) => (
          <FormField
            key={i}
            control={form.control}
            name={form_field.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{form_field.label}</FormLabel>
                <FormControl>
                  <form_field.component
                    autoComplete="on"
                    placeholder={form_field.placeholder}
                    aria-label={form_field.name}
                    type={form_field.type}
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <FormMessage className="my-4 w-full">{error}</FormMessage>
        <Button
          type="submit"
          className="sm:w-64"
          isLoading={isLoading}
          aria-label="submit"
        >
          Iniciar Sesión
        </Button>
      </form>
    </Form>
  );
}
