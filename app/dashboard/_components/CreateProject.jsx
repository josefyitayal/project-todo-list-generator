"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Plus } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createProjectSchema } from "@/schema/createProjectSchema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createProject } from "@/actions/create-project"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function CreateProject() {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient();
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: ""
        }
    })


    const mutation = useMutation({
        mutationFn: (name) => createProject(name),
        onSuccess: (newProject) => {
            // Invalidate project list so it refetches and includes the new one
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ['list-projects'] });
            router.push(`/dashboard/p/${newProject.id}`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    async function onSubmit(data) {
        console.log(data)
        await mutation.mutateAsync(data.name);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button variant="icon" className="w-fit cursor-pointer">
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-name">
                                        Project Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Project Name"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Creating..." : "Create"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
