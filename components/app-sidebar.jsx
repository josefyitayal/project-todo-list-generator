"use client"

import { Calendar, ChevronUp, Home, Inbox, Plus, Search, Settings, User2 } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { UserDropdown } from "@/app/dashboard/_components/UserDropdown"
import { CreateProject } from "@/app/dashboard/_components/CreateProject"
import { SidebarProjectList } from "@/app/dashboard/_components/SidebarProjectList"

export function AppSidebar() {
    const { open } = useSidebar()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader >
                <div className={cn("flex items-center justify-between", open && "px-0")}>
                    {open && (
                        <p className="text-lg font-bold">Logo</p>
                    )}
                    <SidebarTrigger />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/dashboard">
                                        <Home />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <div className="flex items-center justify-between">
                        <SidebarGroupLabel>Projects</SidebarGroupLabel>
                        <SidebarGroupAction asChild>
                            <CreateProject />
                        </SidebarGroupAction>
                    </div>
                    <SidebarGroupContent>
                        <SidebarProjectList />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <UserDropdown />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
