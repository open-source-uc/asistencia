import { useState } from "react";
import { DatePicker } from "@/components/date-picker";
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

interface Field {
  name: "name" | "slug" | "description";
  label: string;
  placeholder: string;
  type: string;
}

const INPUT_FIELDS: Field[] = [
  {
    name: "slug",
    label: "Slug",
    placeholder: "slug-ejemplo",
    type: "text",
  },
  {
    name: "name",
    label: "Nombre",
    placeholder: "Nombre",
    type: "text",
  },
  {
    name: "description",
    label: "Descripción",
    placeholder: "Descripción",
    type: "text",
  },
];

const formSchema = z.object({
  date: z.date(),
  name: z.string().min(1, "Campo requerido"),
  slug: z
    .string()
    .min(1, "Campo requerido")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
  description: z.string().min(1, "Campo requerido"),
});

export default function AddActivityForm({
  addActivity,
}: {
  addActivity: (values: z.infer<typeof formSchema>) => Promise<void>;
}): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(new Date().toDateString()),
      name: "",
      slug: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    addActivity(values).then(
      () => {
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.error(error);
      }
    );
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center relative space-x-4 items-start flex-wrap md:flex-row md:flex-nowrap"
      >
        <FormField
          control={form.control}
          name={"date"}
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1">
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <DatePicker
                  className="w-32"
                  date={field.value}
                  setDate={(date) => {
                    field.onChange(date);
                  }}
                />
              </FormControl>
              <FormMessage className="w-32" />
            </FormItem>
          )}
        />

        {INPUT_FIELDS.map((inputField, i) => (
          <FormField
            key={i}
            control={form.control}
            name={inputField.name}
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1">
                <FormLabel>{inputField.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={inputField.placeholder}
                    type={inputField.type}
                    className="w-32"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="w-32" />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="sm:w-48 mt-4" isLoading={isLoading}>
          Añadir
        </Button>
      </form>
    </Form>
  );
}
