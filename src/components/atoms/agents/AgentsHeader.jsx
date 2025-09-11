import { cn } from "@/lib/utils"

const AgentsHeader = ({ title, description, className }) => {
    return (
        <>
            <div className={cn("w-full space-y-1", className)}>
                <h2 className="flex font-mono text-xl md:text-2xl lg:text-3xl font-semibold items-center gap-6">
                    {title} <span className="flex flex-grow bg-primary h-1 rounded-full"></span>
                </h2>
                {description && (
                    <p className="text-sm md:text-base">
                        {description}
                    </p>
                )}
            </div>
        </>
    )
}

export default AgentsHeader
