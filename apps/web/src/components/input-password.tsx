import React, { useState } from "react";
import { Input, type InputProps } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    return (
      <div className="relative">
        <Input ref={ref} {...props} type={showPassword ? "text" : "password"} />
        <div
          className="absolute cursor-pointer top-1/2 right-2 transform -translate-y-1/2 text-slate-500 hover:text-slate-600"
          onClick={toggleShowPassword}
        >
          {showPassword ? (
            <EyeOffIcon size={20} strokeWidth={1.2} />
          ) : (
            <EyeIcon size={20} strokeWidth={1.2} />
          )}
        </div>
      </div>
    );
  }
);

export default InputPassword;
