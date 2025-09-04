import InterviewHomeScreen from "@/components/organism/agents/InterviewHomeScreen"
import { createClient } from "@/lib/supabase/server"

const InterviewId = async ({ params }) => {

    const { interviewId } = await params
    const supabase = await createClient()

    let { data: Interview } = await supabase
        .from("Interviews")
        .select("*")
        .eq("interview_id", interviewId)
        .single()

    return (
        <>
            <div className="flex-1 px-4 py-4 w-full">
                <div className="flex w-full max-w-7xl mx-auto h-full items-center justify-center">
                    <InterviewHomeScreen interview={Interview} />
                </div>
            </div >
        </>
    )
}

export default InterviewId
