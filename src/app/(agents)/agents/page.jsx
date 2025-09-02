import AgentsHome from "@/components/molecules/agents/AgentsHome"
import AIAgents from "@/components/molecules/agents/AIAgents"

const Agents = () => {
    return (
        <>
            <div className="flex-1 px-4 py-4 w-full overflow-y-auto">
                <div className="flex flex-col w-full max-w-7xl mx-auto">
                    <AgentsHome />
                    <AIAgents />
                </div>
            </div>
        </>
    )
}

export default Agents
