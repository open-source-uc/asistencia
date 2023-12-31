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
import { useForm } from "react-hook-form";
import { useUserSession } from "@/hooks/useUserSession";
import { useState } from "react";
import InputPassword from "../input-password";

interface Field {
  name: "email" | "password" | "repeatPassword";
  label: string;
  placeholder: string;
  type?: string;
  component: typeof Input | typeof InputPassword;
}

const formSchema = z
  .object({
    email: z.string().email("El correo debe ser válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    repeatPassword: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas deben ser iguales",
    path: ["repeatPassword"],
  });

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
  {
    name: "repeatPassword",
    label: "Repetir Contraseña",
    placeholder: "Mínimo 6 caracteres",
    component: InputPassword,
  },
];

export default function RegisterForm() {
  const { signUp } = useUserSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    signUp(values.email, values.password).then(
      () => {
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.log(error);
        setError(
          "Ocurrió un error al registrarse. Revise que no exista una cuenta con el correo ingresado."
        );
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <span className="text-xl font-bold text-center mb-12">Registrarse</span>
        {FORM_FIELDS.map((form_field: Field, i: number) => (
          <FormField
            key={i}
            control={form.control}
            name={form_field.name}
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel>{form_field.label}</FormLabel>
                <FormControl>
                  <form_field.component
                    autoComplete="on"
                    placeholder={form_field.placeholder}
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
        <Button type="submit" className="sm:w-64 my-4" isLoading={isLoading}>
          Registrarse
        </Button>
      </form>
    </Form>
  );
}
