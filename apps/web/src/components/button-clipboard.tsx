import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export const ButtonClipboard = ({
  text,
  alertTitle,
  alertDescription,
}: {
  text: string;
  alertTitle?: string;
  alertDescription: string;
}) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);
  return (
    <Button
      variant={"noshadow"}
      className="p-3"
      onClick={() => {
        setIsCopied(true);
        navigator.clipboard.writeText(text);
        toast({
          title: alertTitle,
          description: alertDescription,
        });
      }}
    >
      {isCopied ? (
        <Check size={16} color="white" />
      ) : (
        <Copy size={16} color="white" />
      )}
    </Button>
  );
};
