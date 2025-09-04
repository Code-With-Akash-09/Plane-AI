"use client"

import { createClient } from "@/lib/supabase/client"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext({})

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider")
    }
    return context
}

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    const signUp = async (values) => {
        const { data, error } = await supabase.auth.signUp({
            email: values.email.toLowerCase().trim(),
            password: values.password,
            options: {
                data: {
                    name: values.name,
                    mobile: values.mobile,
                }
            }
        })

        if (error) {
            return { data, error };
        }

        const user = data.user;

        if (user) {
            await supabase
                .from("Profiles")
                .insert([
                    {
                        uid: data.user.id,
                        email: data.user.email,
                        name: values.name,
                        mobile: values.mobile,
                    }
                ])
        }
        return { data, error }
    }

    const signIn = async (values) => {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password
        })
        return { data, error }
    }

    const getUser = async () => {
        let { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        setLoading(false)
    }

    const signOut = async () => {
        let { error } = await supabase.auth.signOut()
        return { error }
    }

    useEffect(() => {
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )

        return () => subscription?.unsubscribe()
    }, [supabase.auth])

    const value = {
        user,
        loading,
        signUp,
        signIn,
        signOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export { AuthProvider, useAuth }

