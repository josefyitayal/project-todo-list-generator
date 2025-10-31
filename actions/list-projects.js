// server/action/projects.ts
'use server';

import { client } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export const listProjects = async () => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authorized");
    }

    const dbUser = await client.User.findUnique({
        where: { clerk_id: userId },
        include: { projects: true },
    });

    if (!dbUser) {
        throw new Error("User not found in database");
    }

    return dbUser.projects;
};
