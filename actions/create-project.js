"use server"

import { client } from "@/lib/db";
import { createProjectSchema } from "@/schema/createProjectSchema";
import { auth } from "@clerk/nextjs/server";

export const createProject = async (name) => {
    try {
        const { userId } = await auth(); // safer than currentUser()
        if (!userId) {
            throw new Error("User not authorized");
        }

        const dbUser = await client.user.findUnique({
            where: {
                clerk_id: userId,
            },
        })

        if (dbUser) {
            const validateResult = createProjectSchema.safeParse({
                name: name
            })
            if (!validateResult.success) {
                throw new Error(validateResult.error.message)
            }
            const dbProject = await client.Project.create({
                data: {
                    title: name,
                    user: {
                        connect: { id: dbUser.id }
                    }
                }
            })
            if (dbProject) {
                return dbProject
            } else {
                throw new Error("Faild to create project")
            }
        } else {
            throw new Error("user is not found in database")
        }
    } catch (error) {
        throw new Error(error)
    }
}
