import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const page = () => {
    return (
        <div className="flex-1 px-4 py-4 w-full">
            <div className="flex w-full flex-col max-w-7xl mx-auto gap-4 md:gap-6">
                <div className="w-full h-full space-y-6 md:space-y-8 p-4 md:p-6 lg:p-10 rounded-3xl border border-neutral-800 bg-gradient-to-r from-blue-800/40 via-neutral-900 to-purple-600/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full h-full max-w-7xl mx-auto">
                        <div className="flex flex-col gap-4 md:gap-6 w-full md:h-full justify-center">
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold font-mono">
                                One Click. <span className="text-primary">Clean Cut</span>. Perfect Background. ✨
                            </h1>
                            <p className="text-sm md:text-base">
                                Experience lightning-fast background removal powered by smart AI. Whether it’s people, products, or pets — get crisp, transparent results in just one click.
                            </p>
                            <Button
                                asChild
                                className={"w-fit"}
                            >
                                <Link
                                    href="/agents/background-removal/create"
                                >
                                    Get Started
                                    <Sparkles />
                                </Link>
                            </Button>
                        </div>
                        <div className="flex w-full items-center justify-center">
                            <div className="flex aspect-video relative border rounded-2xl h-fit w-full">
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
            </div>
        </div>
    )
}

export default page
