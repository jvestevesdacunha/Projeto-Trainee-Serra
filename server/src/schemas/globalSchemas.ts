import z from "zod"

export const message = z.object({
    message: z.string()
})