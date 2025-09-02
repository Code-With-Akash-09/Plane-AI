"use client"

import Loading from "@/components/atoms/loading"
import MultiSelect from "@/components/atoms/MultiSelect"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { DifficultyLevels, Skills } from "@/constant/agents/agents"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/providers/AuthProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const CreateInterview = () => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const supabase = createClient()

    const form = useForm({
        resolver: zodResolver(CreateInterviewSchema),
        defaultValues: {
            role: "",
            difficulty: "",
            skills: [],
            jobDescription: "",
        },
    })

    const onSubmit = async (values) => {
        setLoading(true)
        const { data, error } = await supabase
            .from('Interviews')
            .insert([
                {
                    uid: user.id,
                    role: values.role,
                    difficulty: values.difficulty,
                    skills: values.skills,
                    jobDescription: values.jobDescription,
                    status: "no-started"
                },
            ])
            .select()
        if (error) {
            toast.error(error.message)
        }
        else {
            form.reset()
            setOpen(false)
            toast.success("Interview Created Successfully!")
        }
        setLoading(false)
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className={"bg-purple-500 text-white hover:text-purple-500"}
            >
                Create Interview
                <PlusIcon />
            </Button>
            <Sheet open={open} onOpenChange={() => setOpen(false)}>
                <SheetContent className={"md:!max-w-lg"}>
                    <SheetHeader className={"border-b "}>
                        <SheetTitle>Create New Interview</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-1 w-full overflow-y-auto max-h-[calc(100vh-80px)] px-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 w-full">
                                <div className="w-full space-y-4 flex-grow">
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={"text-purple-400"}>Interview Role</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        autoFocus={false}
                                                        placeholder="Enter Your Role"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="difficulty"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={"text-purple-400"}>Difficulty Level</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl className="w-full">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="max-h-40">
                                                        {DifficultyLevels.map(
                                                            (item, i) => (
                                                                <SelectItem
                                                                    key={i}
                                                                    value={
                                                                        item.value
                                                                    }
                                                                >
                                                                    {item.label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="skills"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={"text-purple-400"}>Skills</FormLabel>
                                                <FormControl>
                                                    <MultiSelect
                                                        options={Skills}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        placeholder="Select Skills..."
                                                        className={"overflow-x-hidden"}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="jobDescription"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={"text-purple-400"}>Job Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Enter Your Job Description"
                                                        {...field}
                                                        className={"h-40"}
                                                        value={field.value || ""}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <SheetFooter className={"grid grid-cols-2 gap-2 !px-0 md:gap-4 h-fit border-t w-full"}>
                                    <Button
                                        type="submit"
                                        disabled={
                                            form.formState.isSubmitting ||
                                            !form.formState.isValid ||
                                            loading
                                        }
                                        className={"bg-purple-500 text-white hover:text-purple-500 w-full"}
                                    >
                                        {loading ? <> Creating ... <Loading /></> : "Create"}
                                    </Button>
                                    <SheetClose asChild>
                                        <Button variant="outline">Close</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </form>
                        </Form>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default CreateInterview


const CreateInterviewSchema = z.object({
    role: z.string().min(2, { message: "Role is required" }),
    difficulty: z.string().min(2, { message: "Difficulty is required" }),
    skills: z.array(z.string()).min(2, { message: "At least 2 skill is required" }),
    jobDescription: z.string().min(10, { message: "Job description is required" }),
})