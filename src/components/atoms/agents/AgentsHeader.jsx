
const AgentsHeader = ({ title, description }) => {
    return (
        <>
            <div className="w-full space-y-1">
                <h2 className="flex font-mono text-xl md:text-2xl lg:text-3xl font-semibold items-center gap-6">
                    {title} <span className="flex flex-grow bg-purple-500 h-1 rounded-full"></span>
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
