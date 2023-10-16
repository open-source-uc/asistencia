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

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas deben ser iguales",
    path: ["repeatPassword"],
  });

interface IField {
  name: "email" | "password" | "repeatPassword";
  label: string;
  placeholder: string;
  type: string;
}

const FORM_FIELDS: IField[] = [
  {
    name: "email",
    label: "Correo",
    placeholder: "ejemplo@uc.cl",
    type: "email",
  },
  {
    name: "password",
    label: "Contraseña",
    placeholder: "Mínimo 8 caracteres",
    type: "password",
  },
  {
    name: "repeatPassword",
    label: "Repetir Contraseña",
    placeholder: "Mínimo 8 caracteres",
    type: "password",
  },
];

export default function RegisterForm() {
  const { signUp } = useUserSession();
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
    signUp(values.email, values.password).catch((error) => {
      console.log(error);
      setError("Ocurrió un error al registrarse.");
    });
  }

  return (
    <div className="bg-white border-2 border-primary p-12 rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <span className="text-xl font-bold text-center mb-12">
            Registrarse
          </span>
          {FORM_FIELDS.map((form_field: IField, i: number) => (
            <FormField
              key={i}
              control={form.control}
              name={form_field.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{form_field.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={form_field.placeholder}
                      type={form_field.type}
                      className="w-64"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <FormMessage>{error}</FormMessage>
          <Button type="submit" className="w-64">
            Registrarse
          </Button>
        </form>
      </Form>
    </div>
  );
}
