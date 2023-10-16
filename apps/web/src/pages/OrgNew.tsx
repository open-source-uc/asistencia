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
import { requestOrgs } from "@/hooks/useOrgs";
// import { useUserSession } from "@/hooks/useUserSession";

const formSchema = z.object({
  name: z.string(),
  code: z.string(),
  year: z.number(),
  semester: z.string(),
  section: z.string(),
});

interface IField {
  name: "name" | "code" | "year" | "semester" | "section";
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
  {
    name: "code",
    label: "Código",
    placeholder: "Código Organización",
    type: "text",
  },
  {
    name: "year",
    label: "Año",
    placeholder: "Año",
    type: "number",
  },
  {
    name: "semester",
    label: "Semestre",
    placeholder: "Semestre",
    type: "text",
  },
  {
    name: "section",
    label: "Sección",
    placeholder: "Sección",
    type: "text",
  },
];

export default function OrgNew() {
  const { createOrg } = requestOrgs();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      year: new Date().getFullYear(),
      semester: "",
      section: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createOrg(values).then((res) => {
      console.log(res);
    });
  }

  return (
    <div className="bg-white border-2 border-primary p-12 rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            Crear Organización
          </Button>
        </form>
      </Form>
    </div>
  );
}
