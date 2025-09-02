import ProtectedRoute from "@/components/molecules/auth/ProtectedRoute"
import AiNavbar from "@/components/organism/agents/AiNavbar"

const AgentsLayout = ({ children }) => {
    return (
        <>
            <ProtectedRoute>
                <div className="flex flex-col size-full">
                    <AiNavbar />
                    <div className="flex flex-col flex-1 w-full h-[calc(100vh-56px)]">
                        {children}
                    </div >
                </div>
            </ProtectedRoute>
        </>
    )
}

export default AgentsLayout
