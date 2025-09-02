import AgentsHeader from "@/components/atoms/agents/AgentsHeader"
import CreateInterview from "@/components/molecules/agents/CreateInterview"
import InterviewList from "@/components/molecules/agents/InterviewList"

const page = () => {

    return (
        <>
            <div className="flex-1 px-4 py-6 w-full overflow-y-auto">
                <div className="flex w-full flex-col max-w-7xl mx-auto h-full gap-4 md:gap-6">
                    <div className="flex flex-col w-full lg:col-span-3 gap-4 md:gap-6">
                        <div className="w-full space-y-4 md:space-y-6 p-4 md:p-6 rounded-3xl border border-neutral-800">
                            <div className="flex flex-col w-full space-y-1">
                                <h1 className="text-xl md:text-2xl lg:text-3xl  font-mono font-semibold">
                                    AI Interview Preparation
                                </h1>
                                <p className="text-sm md:text-base">
                                    Get ready for your next interview with AI-powered mock interviews, personalized feedback, and tailored practice questions.
                                </p>
                            </div>
                            <CreateInterview />
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 md:gap-6 w-full p-4 md:p-6 rounded-3xl border border-neutral-800">
                        <AgentsHeader
                            title={"Previous Interviews"}
                            description={"Review and analyze your past interview sessions."}
                        />
                        <div className="flex flex-grow w-full gap-4">
                            <InterviewList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
