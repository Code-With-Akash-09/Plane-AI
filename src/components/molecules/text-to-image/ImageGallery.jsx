import AgentsHeader from "@/components/atoms/agents/AgentsHeader";
import { createClient, getUser } from "@/lib/supabase/server";
import ImageCard from "./ImageCard";

const ImageGallery = async () => {

    const supabase = await createClient()
    const user = await getUser()

    let { data: AIImages } = await supabase
        .from('AIImages')
        .select('*')
        .eq("uid", user.id)
        .order("created_at", { ascending: false })
        .limit(8);

    if (!AIImages) {
        return null
    }

    return (
        <>
            <div className="flex flex-col flex-grow-0 gap-6 w-full">
                <AgentsHeader
                    title={"Your Created Images"}
                    description={"Review and analyze your past images."}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    {
                        AIImages?.map((card, i) => (
                            <ImageCard
                                key={i}
                                download={true}
                                card={card}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ImageGallery
