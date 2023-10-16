import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useUserSession } from "@/hooks/useUserSession";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

interface IField {
  name: "email" | "password";
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
];

export default function LoginForm() {
  const { logIn } = useUserSession();
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    logIn(values.email, values.password).catch((error) => {
      console.log(error);
      setError("Ocurrió un error inesperado.");
    });
  }

  return (
    <div className="bg-white p-12 rounded-xl flex flex-col justify-center h-[512px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <span className="text-xl font-bold text-center mb-12">
            Iniciar Sesión
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
                  {field.name === "password" && (
                    <FormDescription className="my-0 py-0 w-64">
                      Olvidaste tu contraseña?{" "}
                      <span className="text-primary font-medium cursor-pointer">
                        Recupérala aquí
                      </span>
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
          ))}
          <FormMessage className="my-4 w-64">{error}</FormMessage>
          <Button type="submit" className="w-64">
            Iniciar Sesión
          </Button>
        </form>
      </Form>
    </div>
  );
}
