import ProtectedRoute from "@/components/molecules/auth/ProtectedRoute"

const AgentsLayout = ({ children }) => {
    return (
        <>
            <ProtectedRoute>
                <div className="flex size-full overflow-y-auto">
                    {children}
                </div >
            </ProtectedRoute>
        </>
    )
}

export default AgentsLayout
