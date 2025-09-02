import AgentsHeader from "@/components/atoms/agents/AgentsHeader"
import GridInterviewList from "@/components/molecules/agents/GridInterviewList"

const List = () => {
    return (
        <>
            <div className="flex-1 px-4 py-4 w-full overflow-y-auto">
                <div className="flex w-full flex-col max-w-7xl mx-auto h-full gap-4 md:gap-6">
                    <div className="flex flex-1 flex-col gap-4 md:gap-6 w-full p-4 md:p-6 rounded-3xl border border-neutral-800">
                        <AgentsHeader
                            title={"Interviews"}
                            description={"Start your interview preparation process with AI-powered mock interviews, personalized feedback, and tailored practice questions."}
                        />
                        <div className="flex flex-grow w-full gap-4">
                            <GridInterviewList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default List
