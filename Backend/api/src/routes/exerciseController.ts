import { prisma } from "../lib/prisma.js";
import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const exerciseController: FastifyPluginAsyncZod = async (app) => {
  const exerciseBodySchema = z.object({
    name: z.string().min(1).max(100),
    details: z.string().min(1).max(255),
    rest: z.string().min(1).max(50),
  });

  const exerciseResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    details: z.string(),
    rest: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

  const errorResponse = z.object({ error: z.string() });

  app.post(
    "/exercises",
    {
      schema: {
        body: exerciseBodySchema,
        response: {
          201: exerciseResponseSchema,
          500: errorResponse,
        },
      },
    },
    async (request, reply) => {
      const { name, details, rest } = request.body;

      try {
        const exercise = await prisma.exercise.create({
          data: { name, details, rest },
        });
        reply.status(201).send(exercise);
      } catch (error) {
        reply.status(500).send({ error: "Erro ao criar exercício" });
      }
    },
  );

  app.get(
    "/exercises",
    {
      schema: {
        response: {
          200: z.array(exerciseResponseSchema),
          500: errorResponse,
        },
      },
    },
    async (_, reply) => {
      try {
        const exercises = await prisma.exercise.findMany({
          orderBy: { createdAt: "desc" },
        });
        reply.send(exercises);
      } catch (error) {
        reply.status(500).send({ error: "Erro ao buscar exercícios" });
      }
    },
  );

  app.get(
    "/exercises/:id",
    {
      schema: {
        params: z.object({ id: z.string() }),
        response: {
          200: exerciseResponseSchema,
          404: errorResponse,
          500: errorResponse,
        },
      },
    },
    async (request, reply) => {
      const id = Number(request.params.id);

      try {
        const exercise = await prisma.exercise.findUnique({ where: { id } });

        if (!exercise) {
          return reply.status(404).send({ error: "Exercício não encontrado" });
        }

        reply.send(exercise);
      } catch (error) {
        reply.status(500).send({ error: "Erro ao buscar exercício" });
      }
    },
  );

  app.put(
    "/exercises/:id",
    {
      schema: {
        params: z.object({ id: z.string() }),
        body: exerciseBodySchema,
        response: {
          200: exerciseResponseSchema,
          404: errorResponse,
          500: errorResponse,
        },
      },
    },
    async (request, reply) => {
      const id = Number(request.params.id);
      const { name, details, rest } = request.body;

      try {
        const exercise = await prisma.exercise.update({
          where: { id },
          data: { name, details, rest },
        });
        reply.send(exercise);
      } catch (error) {
        reply.status(404).send({ error: "Exercício não encontrado" });
      }
    },
  );

  app.delete(
    "/exercises/:id",
    {
      schema: {
        params: z.object({ id: z.string() }),
        response: {
          200: z.object({ message: z.string() }),
          404: errorResponse,
        },
      },
    },
    async (request, reply) => {
      const id = Number(request.params.id);

      try {
        await prisma.exercise.delete({ where: { id } });
        reply.send({ message: "Exercício removido com sucesso" });
      } catch (error) {
        reply.status(404).send({ error: "Exercício não encontrado" });
      }
    },
  );
};
