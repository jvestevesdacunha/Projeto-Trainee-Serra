import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createExercise } from "@/lib/api";

export default function Registrar() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [rest, setRest] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError(null);

    try {
      await createExercise({ name, details, rest });
      navigate("/");
    } catch (err) {
      setError((err as Error).message);
      setSaving(false);
    }
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
            placeholder="Repetições"
          />

          <Input
            value={rest}
            onChange={(e) => setRest(e.target.value)}
            placeholder="Tempo de descanso"
          />

          {error && <p className="text-red-600">{error}</p>}

          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </Button>

        </div>
      </main>
    </div>
  );
}