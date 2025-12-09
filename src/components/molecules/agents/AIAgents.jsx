import AgentsHeader from "@/components/atoms/agents/AgentsHeader"
import AiAgentCard from "@/components/atoms/AiAgentCard"

const AIAgents = () => {
    return (
        <>
            <div className="flex flex-col w-full space-y-4 md:space-y-6 py-6 md:py-8 lg:py-10">
                <AgentsHeader
                    title="AI Agents"
                    description="Your personal team of AI agents, ready to support you anytime, anywhere."
                />
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
        url: "/agents/interview-preparation"
    },
    {
        id: 2,
        name: "Text to Image",
        image: "/assets/banner-img/text-to-image.avif",
        url: "/agents/text-to-image"
    },
    {
        id: 3,
        name: "Background Removal",
        image: "/assets/banner-img/text-to-image.avif",
        url: "/agents/background-removal"
    },
]
