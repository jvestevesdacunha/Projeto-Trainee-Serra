import fastify from "fastify";
import cors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { exerciseController } from "../routes/exerciseController.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
});
app.register(exerciseController);

app
  .listen({ port: 3333, host: "0.0.0.0" })
  .then(() => {
    console.log("HTTP server running on port 3333!");
  })
  .catch((err) => {
    console.error("Server failed to start:", err);
    process.exit(1);
  });
