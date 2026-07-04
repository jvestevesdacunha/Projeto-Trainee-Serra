const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export interface Exercise {
  id: number;
  name: string;
  details: string;
  rest: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseInput {
  name: string;
  details: string;
  rest: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `Erro na requisição (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export async function getExercises(): Promise<Exercise[]> {
  const response = await fetch(`${API_URL}/exercises`);
  return handleResponse<Exercise[]>(response);
}

export async function createExercise(data: ExerciseInput): Promise<Exercise> {
  const response = await fetch(`${API_URL}/exercises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Exercise>(response);
}

export async function updateExercise(
  id: number,
  data: ExerciseInput,
): Promise<Exercise> {
  const response = await fetch(`${API_URL}/exercises/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Exercise>(response);
}

export async function deleteExercise(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/exercises/${id}`, {
    method: "DELETE",
  });
  await handleResponse<{ message: string }>(response);
}
