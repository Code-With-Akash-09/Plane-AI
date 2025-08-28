"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/providers/AuthProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const SignUpForm = () => {

    const [loading, setLoading] = useState(false)
    const { signUp } = useAuth()
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            mobile: "",
            password: "",
        },
    })

    const onSubmit = async (values) => {
        setLoading(true)
        const { error } = await signUp(values)

        if (error) {
            toast.warning(error.message)
        }
        else {
            toast.success("Account created successfully!")
            router.push("/agents")
        }
        setLoading(false)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter Your Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter Your Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mobile Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter You Mobile No"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter Your Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={
                            form.formState.isSubmitting ||
                            !form.formState.isValid ||
                            loading
                        }
                        className={"w-full text-white bg-purple-500 hover:text-purple-500"}>
                        {loading ? "Loading..." : "Register"}
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default SignUpForm

const SignUpFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(100, { message: "Name cannot be longer than 100 characters" }),
    email: z
        .string()
        .email({ message: "Please enter a valid email address" })
        .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
        .toLowerCase()
        .trim(),
    mobile: z
        .string()
        .min(10, { message: "Mobile number must be at least 10 digits" })
        .max(15, { message: "Mobile number cannot exceed 15 digits" })
        .trim(),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(100, { message: "Password cannot be longer than 100 characters" }),
})
