"use client"

import { getOpenRouterCredits, openAITextToImage } from "@/actions/ai"
import { BorderBeam } from "@/components/atoms/BorderBeam"
import Loading from "@/components/atoms/loading"
import { PixelImage } from "@/components/magicui/PixelImage"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/providers/AuthProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { Download, Image, Stars } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const ImageGeneration = () => {

    const supabase = createClient()
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")
    const [credits, setCredits] = useState(0)

    const form = useForm({
        resolver: zodResolver(ImageGenerationSchema),
        defaultValues: {
            // prompt: "A photorealistic close- up portrait of an elderly Japanese ceramicist with deep, sun- etched wrinkles and a warm, knowing smile.He is carefully inspecting a freshly glazed tea bowl.The setting is his rustic, sun - drenched workshop with pottery wheels and shelves of clay pots in the background.The scene is illuminated by soft, golden hour light streaming through a window, highlighting the fine texture of the clay and the fabric of his apron.Captured with an 85mm portrait lens, resulting in a soft, blurred background(bokeh).The overall mood is serene and masterful.",
            prompt: ""
        }
    })

    const getCredits = async () => {
        const { data: { total_credits, total_usage } } = await getOpenRouterCredits()
        let remainingCredits = Math.floor(total_usage - total_credits)
        setCredits(remainingCredits)
    }

    const onSubmit = async (values) => {
        if (credits <= 0) {
            toast.warning("You don't have enough credits to generate an image")
        }
        else {
            setLoading(true)
            const body = { prompt: values.prompt }
            const { imageUrl } = await openAITextToImage(body)

            if (imageUrl) {
                const { error: supabaseError } = await supabase
                    .from('AIImages')
                    .insert([
                        {
                            uid: user.id,
                            prompt: values.prompt,
                            image_url: imageUrl
                        },
                    ])
                    .select()

                if (supabaseError) {
                    toast.error("Failed to save image to supabase")
                }
                setImage(imageUrl)
                setLoading(false)
            }
            setLoading(false)
            toast.error("Failed to generate image")
        }
    }

    const downloadImage = async () => {
        if (!image) return
        const response = await fetch(image)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = "ai-image.png"
        document.body.appendChild(a)
        a.click()
        a.remove()

        window.URL.revokeObjectURL(url)
    }

    useEffect(() => {
        user && getCredits()
    }, [user])

    return (
        <div className="flex flex-col w-full space-y-4 flex-1 max-h-60 lg:max-h-[900px] sm:p-4 md:p-6 lg:px-16 rounded-3xl relative">
            <div className="flex w-full items-center justify-center">
                <Badge
                    variant={credits > 0 ? "default" : "destructive"}
                >
                    Credits: {credits}
                </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center justify-center w-full h-full max-w-7xl mx-auto">
                <div className="flex w-full md:h-full md:items-center md:justify-center">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col w-full md:h-[90%] space-y-4 md:space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="h-80 md:h-full flex-grow w-full">
                                        <FormControl>
                                            <Textarea
                                                type="text"
                                                placeholder="Example: A magical forest with glowing mushrooms and fireflies....."
                                                className={"min-h-32 max-h-80 md:max-h-full w-full text-neutral-200"}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex w-full items-center justify-center">
                                <Button
                                    type="submit"
                                    disabled={loading || form.formState.isSubmitting || !form.formState.isValid}
                                    className={"w-full"}
                                >
                                    {loading ? (
                                        <>
                                            Generating...
                                            <Loading className="text-white" />
                                        </>
                                    ) : (
                                        <>
                                            Generate Image
                                            <Stars />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
                <div className="flex w-full md:h-full md:items-center md:justify-center">
                    {
                        image ? (
                            <div className="flex relative rounded-2xl mx-auto w-full aspect-square md:h-[90%] border border-neutral-800 group hover:border-primary transition-all bg-white/5 backdrop-blur-sm">
                                <PixelImage
                                    src={image}
                                    customGrid={{ rows: 4, cols: 6 }}
                                    grayscaleAnimation
                                />
                                <Button
                                    size={"icon"}
                                    onClick={downloadImage}
                                    className={"cursor-pointer group-hover:md:visible md:invisible absolute top-4 right-4"}
                                >
                                    <Download className="size-5" />
                                </Button>
                            </div>
                        ) : !loading ? (
                            <div className="flex flex-col gap-6 relative rounded-2xl mx-auto w-full aspect-square md:h-[90%] bg-white/5 backdrop-blur-sm items-center justify-center text-neutral-600 border border-neutral-800">
                                <Image className="size-20" />
                                Image Will be loaded here
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6 relative rounded-2xl mx-auto w-full aspect-square md:h-[90%] bg-white/5 backdrop-blur-sm items-center justify-center text-neutral-600">
                                <Skeleton className="h-full w-full" />
                                <Loading className="size-5 text-purple-500 absolute" />
                            </div>
                        )
                    }
                </div>
            </div>
            <BorderBeam
                duration={20}
                borderWidth={2}
                className="hidden md:flex from-transparent via-purple-500 to-transparent"
            />
            <BorderBeam
                duration={20}
                delay={10}
                borderWidth={2}
                className="hidden md:flex from-transparent via-purple-500 to-transparent"
            />
        </div>
    )
}

export default ImageGeneration

const ImageGenerationSchema = z.object({
    prompt: z
        .string()
        .min(10, {
            message: "Prompt must be at least 10 characters."
        }),
})