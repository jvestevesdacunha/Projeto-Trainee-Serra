import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { hashPassword, verifyPassword } from "../utils/hash";

export class UserController {

    async register(request: FastifyRequest, reply: FastifyReply) {

        const { name, email, password } = request.body as any

        const emailExists = await prisma.user.findUnique({
            where: { email }
        })

        if (emailExists) return reply.status(400).send({ message: "E-mail já cadastrado" })

        const hashedPassword = await hashPassword(password)

        try {
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                }
            })
            return reply.status(201).send(newUser)
        } catch (error) {
            return reply.status(500).send({ message: "Erro interno do servidor" })
        }
    }

    async login(request: FastifyRequest, reply: FastifyReply) {

        const { email, password } = request.body as any

        try {
            const user = await prisma.user.findUnique({
                where: { email }
            })

            if (!user) return reply.status(400).send({ message: "Credenciais Invalidas" })

            const passwordMatch = await verifyPassword(password, user.password)

            if (!passwordMatch) return reply.status(400).send({ message: "Credenciais Invalidas" })

            const token = await reply.jwtSign({
                id: user.id,
                email: user.email,
                role: user.role
            })
            return reply.status(200).send({ message: "Login Realizado com Sucesso", token })
        } catch (error) {
            return reply.status(500).send({ message: "Erro interno do servidor" })
        }
    }
}