
const AuthLayout = ({ children }) => {
    return (
        <div className="size-full">
            <div className="relative grid grid-cols-1 md:grid-cols-2 size-full md:p-8 lg:p-10 md:gap-8">
                <div className="flex w-full h-full bg-gradient-to-b from-blue-500/40 to-purple-500/40 md:rounded-4xl">
                </div>
                <div className="flex absolute md:relative z-10 w-full h-full items-center justify-center md:bg-neutral-900 md:backdrop-blur-sm md:rounded-4xl">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
