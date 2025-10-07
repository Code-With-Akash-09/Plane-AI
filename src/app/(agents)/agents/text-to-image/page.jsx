import AgentsHeader from "@/components/atoms/agents/AgentsHeader"
import ImageCard from "@/components/molecules/text-to-image/ImageCard"
import { Button } from "@/components/ui/button"
import { createClient, getUser } from "@/lib/supabase/server"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const page = async () => {

    const user = await getUser();
    const supabase = await createClient();

    const { data: Images = [] } = await supabase
        .from("AIImages")
        .select("*")
        .eq("uid", user.id)
        .order("created_at", { ascending: false })
        .limit(4)

    return (
        <div className="flex-1 px-4 py-4 w-full overflow-y-auto scrollbar-hide">
            <div className="flex w-full flex-col max-w-7xl mx-auto gap-4 md:gap-6">
                <div className="w-full h-fit space-y-6 md:space-y-8 p-4 md:p-6 lg:p-10 rounded-3xl border border-neutral-800 bg-gradient-to-r from-blue-800/40 via-neutral-900 to-purple-600/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full h-full max-w-7xl mx-auto">
                        <div className="flex flex-col gap-4 md:gap-6 w-full h-full justify-center">
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold font-mono">
                                Create. <span className="text-primary">Imagine</span>. Generate.
                            </h1>
                            <p className="text-sm md:text-base">
                                Bring your words to life with stunning visuals. Simply describe what you want, and our AI transforms your text into high-quality images instantly. Perfect for designers, creators, and innovators who want to explore limitless creativity without lifting a brush.
                            </p>
                            <Button
                                asChild
                                className={"w-fit"}
                            >
                                <Link
                                    href="/agents/text-to-image/create"
                                >
                                    Start Creating
                                    <ArrowRight />
                                </Link>
                            </Button>
                        </div>
                        <div className="flex w-full">
                            <div className="flex aspect-video relative border rounded-2xl w-full">
                                <Image
                                    src={"/assets/banner-img/text-to-image.avif"}
                                    alt="Text to Image"
                                    fill
                                    className="object-cover rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    Images?.length > 0 && (
                        <>
                            <div className="flex flex-col flex-grow-0 gap-6 w-full">
                                <AgentsHeader
                                    title={"Your Created Images"}
                                    description={"Review and analyze your past images."}
                                />
                                <div
                                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full h-fit"
                                >
                                    {Images.map((card, i) => (
                                        <ImageCard
                                            key={i}
                                            download={true}
                                            card={card}
                                        />
                                    ))}
                                </div>
                            </div>
                            <Button
                                asChild
                                className={"w-fit mx-auto flex"}
                            >
                                <Link
                                    className="cursor-pointer"
                                    href={"/agents/text-to-image/gallery"}
                                >
                                    See More Imagess
                                    <ArrowRight />
                                </Link>
                            </Button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default page
