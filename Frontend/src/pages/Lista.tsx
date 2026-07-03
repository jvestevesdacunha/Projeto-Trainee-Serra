import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Exercise {
  id: number;
  name: string;
  details: string;
  rest: string;
}

export default function Lista() {
  const [search, setSearch] = useState("");

  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 1,
      name: "Supino Reto",
      details: "4 séries de 10 reps, 60kg",
      rest: "1 Minuto e 30 Segundos",
    },
    {
      id: 2,
      name: "Agachamento",
      details: "3 séries de 12 reps, 80kg",
      rest: "2 Minutos",
    },
    {
      id: 3,
      name: "Puxada Alta",
      details: "4 séries de 12 reps, 50kg",
      rest: "1 Minuto",
    },
    {
      id: 4,
      name: "Rosca Direta",
      details: "3 séries de 10 reps, 15kg cada lado",
      rest: "1 Minuto",
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [editRest, setEditRest] = useState("");

  const handleDelete = (id: number) => {
    setExercises(
      exercises.filter((exercise) => exercise.id !== id)
    );
  };

  const handleEdit = (exercise: Exercise) => {
    setEditingId(exercise.id);
    setEditName(exercise.name);
    setEditDetails(exercise.details);
    setEditRest(exercise.rest);
  };

  const handleSaveEdit = () => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === editingId
          ? {
              ...exercise,
              name: editName,
              details: editDetails,
              rest: editRest,
            }
          : exercise
      )
    );

    setEditingId(null);
    setEditName("");
    setEditDetails("");
    setEditRest("");
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

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredExercises.length === 0 ? (
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
                        placeholder="Repetições e carga"
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
                          className="bg-blue-600 hover:bg-blue-700"
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