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
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    repeatPassword: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas deben ser iguales",
    path: ["repeatPassword"],
  });

interface Field {
  name: "password" | "repeatPassword";
  label: string;
  placeholder: string;
  type: string;
}

interface Message {
  type: "error" | "success" | undefined;
  content: string;
}

const FORM_FIELDS: Field[] = [
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

export default function EditUser() {
  const { editUser } = useUserSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({
    type: undefined,
    content: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    editUser({ password: values.password }).then(
      () => {
        setIsLoading(false);
        form.reset();
        setMessage({
          type: "success",
          content: "Contraseña cambiada con éxito",
        });
      },
      (error) => {
        setIsLoading(false);
        console.log(error);
        setMessage({
          type: "error",
          content: "Ha ocurrido un error al cambiar la contraseña",
        });
      }
    );
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
                  <Input
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
        {message.type === "error" && (
          <FormMessage className="my-4 w-full">{message.content}</FormMessage>
        )}
        {message.type === "success" && (
          <div className="my-4 w-full text-primary">{message.content}</div>
        )}
      </form>
    </Form>
  );
}
