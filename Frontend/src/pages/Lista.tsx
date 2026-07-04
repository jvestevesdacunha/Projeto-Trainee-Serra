import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  deleteExercise,
  getExercises,
  updateExercise,
  type Exercise,
} from "@/lib/api";

export default function Lista() {
  const [search, setSearch] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [editRest, setEditRest] = useState("");

  useEffect(() => {
    getExercises()
      .then(setExercises)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteExercise(id);
      setExercises(exercises.filter((exercise) => exercise.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleEdit = (exercise: Exercise) => {
    setEditingId(exercise.id);
    setEditName(exercise.name);
    setEditDetails(exercise.details);
    setEditRest(exercise.rest);
  };

  const handleSaveEdit = async () => {
    if (editingId === null) return;

    try {
      const updated = await updateExercise(editingId, {
        name: editName,
        details: editDetails,
        rest: editRest,
      });

      setExercises(
        exercises.map((exercise) =>
          exercise.id === editingId ? updated : exercise
        )
      );

      setEditingId(null);
      setEditName("");
      setEditDetails("");
      setEditRest("");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      exercise.details
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      exercise.rest
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Lista de Exercícios
          </h2>

          <Link to="/registrar">
            <Button className="bg-[#8A0303] hover:bg-[#6d0202] text-white">
              Novo Exercício
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <Input
            placeholder="Buscar exercício..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-[#8A0303] bg-gray-800 text-white placeholder:text-gray-400"
          />
        </div>

        {error && (
          <div className="mb-6 text-center text-red-600">{error}</div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {loading ? (
            <div className="col-span-full text-center text-gray-500 text-lg">
              Carregando exercícios...
            </div>
          ) : filteredExercises.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg">
              Nenhum exercício encontrado.
            </div>
          ) : (
            filteredExercises.map((exercise) => (
              <Card
                key={exercise.id}
                className="bg-[#8A0303] border-none text-white"
              >
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {exercise.name}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {editingId === exercise.id ? (
                    <div className="space-y-3">
                      <Input
                        value={editName}
                        onChange={(e) =>
                          setEditName(e.target.value)
                        }
                        placeholder="Nome"
                        className="bg-white text-black"
                      />

                      <Input
                        value={editDetails}
                        onChange={(e) =>
                          setEditDetails(e.target.value)
                        }
                        placeholder="Repetições"
                        className="bg-white text-black"
                      />

                      <Input
                        value={editRest}
                        onChange={(e) =>
                          setEditRest(e.target.value)
                        }
                        placeholder="Tempo de descanso"
                        className="bg-white text-black"
                      />

                      <div className="flex gap-2">
                        <Button
                          className="bg-green-600 hover:bg-green-700"
                          onClick={handleSaveEdit}
                        >
                          Salvar
                        </Button>

                        <Button
                          variant="outline"
                          className="text-black"
                          onClick={() =>
                            setEditingId(null)
                          }
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="mb-2">
                        <strong>Repetições:</strong>{" "}
                        {exercise.details}
                      </p>

                      <p className="mb-4">
                        <strong>Descanso:</strong>{" "}
                        {exercise.rest}
                      </p>

                      <div className="flex gap-2">
                        <Button
                          className="bg-gray-800 hover:bg-gray-900"
                          onClick={() =>
                            handleEdit(exercise)
                          }
                        >
                          Editar
                        </Button>

                        <Button
                          className="bg-red-700 hover:bg-red-800"
                          onClick={() =>
                            handleDelete(exercise.id)
                          }
                        >
                          Excluir
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </section>
      </main>
    </div>
  );
}