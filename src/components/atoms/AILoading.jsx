import { cn } from "@/lib/utils"
import Image from "next/image"

const AILoading = (className) => {
    return (
        <div className={cn("size-full", className)}>
            <Image
                src={"./assets/banner-img/loading.avif"}
                alt="Loading"
                fill
                className="object-cover"
            />
        </div>
    )
}

export default AILoading
