"use client"

import Loading from "@/components/atoms/loading"
import { useAuth } from "@/providers/AuthProvider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const ProtectedRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth")
        }
    }, [user, loading, router])

    if (loading) return (
        <div className="flex size-full items-center justify-center">
            <Loading className="text-blue-500" />
        </div>
    )

    if (!user) return null

    return children
}

export default ProtectedRoute
