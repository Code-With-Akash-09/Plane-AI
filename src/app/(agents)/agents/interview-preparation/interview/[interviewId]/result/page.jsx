import AgentsHeader from "@/components/atoms/agents/AgentsHeader"
import ResultCard from "@/components/molecules/agents/ResultCard"
import { createClient, getUser } from "@/lib/supabase/server"

const InterviewResult = async ({ params }) => {

    const { interviewId } = await params
    const supabase = await createClient()
    const user = await getUser()

    const { data: { question_list: questions = null } = null, error } = await supabase
        .from("Interviews")
        .select("question_list")
        .eq("uid", user.id)
        .eq("status", "completed")
        .eq("interview_id", interviewId)
        .single()

    return (
        <>
            <div className="flex-1 md:px-4 py-4 w-full overflow-y-auto scrollbar-hide">
                <div className="flex w-full max-w-7xl mx-auto h-auto">
                    <div className="flex flex-1 flex-col gap-4 md:gap-6 w-full">
                        <AgentsHeader
                            title={"Interview Result"}
                            description={"Review and analyze your past interview sessions."}
                            className={"px-4 md:px-0"}
                        />
                        <div className="flex h-fit gap-4 md:gap-6 lg:gap-8 w-full flex-col">
                            {
                                questions?.map((question, i) => (
                                    <ResultCard key={i} question={question} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InterviewResult
