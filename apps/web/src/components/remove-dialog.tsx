import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function RemoveDialog({
  ...props
}: {
  onRemove: () => void;
  text?: string;
  title?: string;
  componentTrigger?: React.ReactNode;
}) {
  const { onRemove, text, title, componentTrigger } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {componentTrigger || (
          <Button
            variant={"outline"}
            className="hover:bg-red-500 hover:text-white"
          >
            Eliminar
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || "¿Estás seguro?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {text || "Esta acción no se puede deshacer."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onRemove}
            className="bg-red-500 hover:bg-red-600"
          >
            Eliminar elementos seleccionados
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
