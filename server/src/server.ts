import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { hasZodFastifySchemaValidationErrors, serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod"
import { UserRoutes } from "./routes/userRoutes";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
})

app.register(UserRoutes)

app.setErrorHandler((error, _, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
        const firstError = error.validation[0]

        return reply.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            message: firstError.message
        })
    }
    return reply.send(error)
})

const jwtToken = process.env.JWT_TOKEN
if (!jwtToken) throw new Error("ENV - JWT_TOKEN não foi definido")
app.register(fastifyJwt, {
    secret: jwtToken
})

app.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
    console.log("🚀 Server Running on localhost:3000")
    console.log("📗 Documentation available in localhost:3000/docs")
})