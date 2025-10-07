"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Image from "next/image"

const ImageCard = ({ card, download = false }) => {

    const downloadImage = async (image) => {
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

    return (
        <>
            <div
                className="flex flex-col gap-4 md:gap-6 w-full h-full justify-center items-center group border border-neutral-800 hover:border-primary transition-all ease-in-out cursor-pointer bg-white/10 rounded-2xl p-4 aspect-square relative">
                <Image
                    src={card?.image_url}
                    alt="Generated Image"
                    fill
                    className="object-cover rounded-2xl"
                />
                <div className="absolute flex p-4 z-10 visible group-hover:md:opacity-100 md:opacity-0 group-hover:md:visible md:invisible top-0 inset-x-0 rounded-2xl transition-all ease-in-out bg-gradient-to-b h-full w-full from-transparent to-black/20 items-end justify-end">
                    {download && (
                        <Button
                            size={"icon"}
                            className={"cursor-pointer"}
                            onClick={() => downloadImage(card?.image_url)}
                        >
                            <Download />
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export default ImageCard
