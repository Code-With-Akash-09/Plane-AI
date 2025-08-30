import AiAgentCard from "@/components/atoms/AiAgentCard"

const AIAgents = () => {
    return (
        <>
            <div className="flex flex-col w-full space-y-4 md:space-y-6 py-6 md:py-8 lg:py-10">
                <div className="w-full space-y-1">
                    <h2 className="flex font-mono text-xl md:text-2xl lg:text-3xl font-semibold items-center gap-6">
                        AI Agents <span className="flex flex-grow bg-purple-500 h-1 rounded-full"></span>
                    </h2>
                    <p className="text-sm md:text-base">
                        Your personal team of AI agents, ready to support you anytime, anywhere.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                    {Agents.map(agent => (
                        <AiAgentCard key={agent.id} agent={agent} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default AIAgents

const Agents = [
    {
        id: 1,
        name: "Interview Preparation",
        image: "/assets/banner-img/interview-preparation.avif",
        url: "./agents/interview-preparation"
    },
]
