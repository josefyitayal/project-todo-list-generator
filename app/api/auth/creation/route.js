import { client } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await currentUser()

    if (!user) {
        throw new Error("something went wrong")
    }

    let dbUser = await client.user.findUnique({
        where: {
            clerk_id: user.id
        }
    })

    if (!dbUser) {
        dbUser = await client.user.create({
            data: {
                clerk_id: user.id,
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.emailAddresses[0].emailAddress,
                profile_picture: user.imageUrl
            }
        })
    }

    return NextResponse.redirect("http://localhost:3000/dashboard")
}