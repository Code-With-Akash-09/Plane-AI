"use client"

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

    if (loading) return <div>Loading...</div>

    if (!user) return null

    return children
}

export default ProtectedRoute
