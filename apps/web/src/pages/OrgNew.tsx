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
import { useOrgs } from "@/hooks/useOrgs";

interface Field {
  name: "name";
  label: string;
  placeholder: string;
  type: string;
}

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
});

const FORM_FIELDS: Field[] = [
  {
    name: "name",
    label: "Nombre",
    placeholder: "Nombre Organización",
    type: "text",
  },
];

export default function OrgNew() {
  const orgs = useOrgs();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await orgs
      .createOrg({
        ...values,
        slug: crypto.randomUUID(),
      })
      .then(() => {
        form.reset();
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-3/4">
        <span className="text-xl font-bold text-center mb-12">
          Nueva Organización
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
                  <Input
                    placeholder={form_field.placeholder}
                    type={form_field.type}
                    className="w-full"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-64" isLoading={orgs.orgs.isLoading}>
          Crear Organización
        </Button>
      </form>
    </Form>
  );
}
