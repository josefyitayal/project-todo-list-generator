"use client"

import { listProjects } from "@/actions/list-projects";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { FolderCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarProjectList() {
    const pathname = usePathname()

    const { data: projects, isLoading, isError, error } = useQuery({
        queryKey: ['list-projects'],
        queryFn: () => listProjects()
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>{String(error)}</div>

    return (
        <SidebarMenu>
            {projects.map((project) => (
                <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton isActive={`/dashboard/p/${project.id}` === pathname} asChild>
                        <Link href={`/dashboard/p/${project.id}`}>
                            <FolderCheck />
                            <span>{project.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}
