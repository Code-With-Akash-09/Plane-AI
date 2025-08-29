import Image from "next/image"
import Link from "next/link"
import { GlowCard } from "../magic/GlowCard"

const AiAgentCard = ({ agent }) => {
    return (
        <GlowCard customSize className="w-full !rounded-2xl">
            <Link
                href={agent.url}
                className="space-y-2 w-full"
            >
                <div className="relative w-full aspect-video">
                    <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
                <span className="text-lg font-semibold">{agent.name}</span>
            </Link>
        </GlowCard>
    )
}

export default AiAgentCard
