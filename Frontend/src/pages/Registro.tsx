import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Registrar() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [rest, setRest] = useState("");

  function handleSave() {
    console.log({
      name,
      details,
      rest,
    });

    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-2xl mx-auto p-6">
        <div className="flex flex-col gap-4">
          
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do exercício"
          />

          <Input
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Repetições e carga"
          />

          <Input
            value={rest}
            onChange={(e) => setRest(e.target.value)}
            placeholder="Tempo de descanso"
          />

          <Button onClick={handleSave}>
            Salvar
          </Button>

        </div>
      </main>
    </div>
  );
}