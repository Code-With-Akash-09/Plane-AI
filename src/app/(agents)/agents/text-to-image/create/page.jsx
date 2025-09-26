import ImageGeneration from "@/components/molecules/text-to-image/ImageGeneration"

const page = () => {
    return (
        <div className="flex-1 px-4 py-4 w-full overflow-y-auto">
            <div className="flex w-full flex-col max-w-7xl mx-auto h-full gap-4 md:gap-6">
                <ImageGeneration />
            </div>
        </div>
    )
}

export default page
