import { FastifyInstance } from "fastify";
import { UserController } from "../controller/userController";
import z from "zod";
import { message } from "../schemas/globalSchemas";

const userController = new UserController()

export async function UserRoutes(app: FastifyInstance) {
    app.post("/register", {
        schema: {
            body: z.object({
                name: z.string(),
                email: z.email(),
                password: z.string().min(8)
            }),
            response: {
                201: z.object({
                    id: z.string(),
                    name: z.string(),
                    email: z.email(),
                }),
                400: message,
                500: message
            }
        }
    }, userController.register)

    app.post("/login", {
        schema: {
            body: z.object({
                email: z.email(),
                password: z.string()
            }),
            response: {
                200: z.object({
                    message: z.string(),
                    token: z.string()
                }),
                400: message,
                404: message,
                500: message
            }
        }
    }, userController.login)
}