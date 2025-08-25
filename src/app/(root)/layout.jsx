import Navbar from "@/components/organism/Navbar"

const RootLayout = ({ children }) => {
    return (
        <>
            <div className="flex h-full w-full flex-col overflow-hidden">
                <Navbar />
                {children}
            </div>
        </>
    )
}

export default RootLayout
