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

const formSchema = z.object({
  date: z.date(),
  slug: z.string().min(1, "Campo requerido"),
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
      date: new Date(),
      slug: "",
      description: "1",
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
        className="flex md:flex-row justify-center relative md:space-x-4 flex-col items-start"
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

        <FormField
          control={form.control}
          name={"slug"}
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1">
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Nombre"}
                  type={"text"}
                  className="w-32"
                  {...field}
                />
              </FormControl>
              <FormMessage className="w-32" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1">
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Descripción"}
                  type={"text"}
                  className="w-32"
                  {...field}
                />
              </FormControl>
              <FormMessage className="w-32" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-64 mt-4" isLoading={isLoading}>
          Añadir
        </Button>
      </form>
    </Form>
  );
}
