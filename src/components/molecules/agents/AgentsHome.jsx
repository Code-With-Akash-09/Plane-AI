
const AgentsHome = () => {
    return (
        <>
            <div className="relative w-full h-auto flex overflow-hidden">
                <div
                    className="flex absolute inset-x-0 top-0 rounded-3xl z-0 h-full items-center justify-center w-full bg-gradient-to-r from-blue-800/40 via-neutral-900 to-purple-600/30"
                >
                </div>
                <div className="z-10 border border-neutral-800 p-6 md:p-8 lg:p-10 xl:p-14 w-full rounded-3xl bg-[url('/assets/banner-img/loading.avif')] bg-contain bg-right md:bg-left bg-no-repeat md:justify-end flex">
                    <div className="space-y-2 md:space-y-4 w-full md:w-2/3 lg:w-3/4 backdrop-blur-sm p-4 rounded-2xl">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl md:text-purple-500/100 font-semibold">
                            All-in-One <br /> AI Agents Platform
                        </h1>
                        <p className="text-sm md:text-base">
                            A single place for multiple AI-powered agents — each crafted for specific tasks like research, coding, interviews, design, and more. Your personal team of AI experts, always available.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgentsHome
