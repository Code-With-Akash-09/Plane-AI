import AuroraBackground from "@/components/atoms/AuroraBackground"

const AuthLayout = ({ children }) => {
    return (
        <div className="size-full">
            <div className="relative grid grid-cols-1 md:grid-cols-2 size-full md:p-8 lg:p-10 md:gap-8">
                <div className="flex w-full h-full relative md:rounded-4xl md:border md:border-neutral-800">
                    <AuroraBackground className="md:rounded-4xl" />
                </div>
                <div className="flex absolute md:relative z-10 w-full h-full items-center justify-center md:bg-neutral-900 md:backdrop-blur-sm md:rounded-4xl border border-neutral-800 inset-shadow-sm inset-shadow-blue-600">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
