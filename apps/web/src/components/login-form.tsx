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
  const { setUserSession } = useUserSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(values),
    }).then(async (res) => {
      const data = await res.json();
      if (data.detail) {
        console.log(data.detail);
        return;
      }
      setUserSession({
        name: data.name,
        email: data.email,
        token: data.token,
        isValid: true,
      });
    });
  }

  return (
    <div className="bg-white border-2 border-primary p-12 rounded-xl">
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
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="w-64">
            Iniciar Sesión
          </Button>
        </form>
      </Form>
    </div>
  );
}
