import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserSession } from "@/hooks/useUserSession";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Settings(): JSX.Element {
  const navigate = useNavigate();
  const { userSession, logOut, editUser } = useUserSession();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    if (
      formData.password === "" ||
      formData.confirmPassword === "" ||
      formData.password !== formData.confirmPassword
    )
      return;
    editUser({ password: formData.password});
    setFormData({ password: "", confirmPassword: "" });
  };

  return (
    <div className="space-y-6 flex flex-col items-center px-4">
      {userSession.isLoggedIn && (
        <>
          <h2 className="text-3xl font-bold text-center">
            {userSession.email}
          </h2>
        </>
      )}

      <Button
        onClick={() => {
          logOut();
          navigate(`/`);
        }}
      >
        Cerrar Sesión
      </Button>

      <span>Cambiar contraseña</span>
      <Input
        type="password"
        name="password"
        placeholder="Nueva contraseña"
        onChange={handleChange}
        value={formData.password}
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirmar contraseña"
        onChange={handleChange}
        value={formData.confirmPassword}
      />
      <Button onClick={handleSubmit}>Cambiar contraseña</Button>
    </div>
  );
}
