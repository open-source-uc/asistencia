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
import { useForm } from "react-hook-form";
import { handlerOrgs } from "@/hooks/useOrgs";
import { useUserSession } from "@/hooks/useUserSession";

const formSchema = z.object({
  name: z.string(),
});

interface IField {
  name: "name";
  label: string;
  placeholder: string;
  type: string;
}

const FORM_FIELDS: IField[] = [
  {
    name: "name",
    label: "Nombre",
    placeholder: "Nombre Organización",
    type: "text",
  },
];

export default function OrgNew() {
  const { userSession } = useUserSession();
  const [isLoading, setIsLoading] = useState(false);
  const { createOrg } = handlerOrgs(userSession.access_token);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLoading(true);
    await createOrg(values).then(() => {
      setIsLoading(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-3/4">
        <div>[TEMPORAL]</div>
        <span className="text-xl font-bold text-center mb-12">
          Nueva Organización
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
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-64" isLoading={isLoading}>
          Crear Organización
        </Button>
      </form>
    </Form>
  );
}
