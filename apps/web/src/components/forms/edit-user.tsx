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
import InputPassword from "@/components/input-password";

const formSchema = z
  .object({
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

interface Field {
  name: "password" | "repeatPassword";
  label: string;
  placeholder: string;
  type?: string;
  component: typeof Input | typeof InputPassword;
}

const FORM_FIELDS: Field[] = [
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

export default function EditUser() {
  const { editUser } = useUserSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    editUser({ password: values.password }).then(() => {
      setIsLoading(false);
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl">
        <span className="text-xl font-bold text-center mb-12">
          Cambiar Contraseña
        </span>
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
        <Button type="submit" className="w-64 my-4" isLoading={isLoading}>
          Cambiar contraseña
        </Button>
      </form>
    </Form>
  );
}
