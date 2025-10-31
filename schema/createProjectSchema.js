import z from "zod";

export const createProjectSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 character").max(55, "Name must be at most 55 character")
})
