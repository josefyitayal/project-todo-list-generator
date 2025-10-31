"use client"

import { ChevronUp } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import Image from "next/image"
import { SignOutButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { ThemeToggle } from "@/components/ThemeToggle"

export function UserDropdown() {
    const { user, isLoaded } = useUser()

    if (!isLoaded) {
        return;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                    <Image src={user.imageUrl} alt="user image" width={24} height={24} className="rounded-lg object-cover size-6" />
                    <p>{user.emailAddresses[0].emailAddress}</p>
                    <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
            >
                <DropdownMenuItem>
                    <Link href="/dashboard/user-account">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SignOutButton>
                        <span>Sign out</span>
                    </SignOutButton>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <ThemeToggle />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
