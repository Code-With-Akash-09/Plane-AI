"use client"

import Logo from "@/components/atoms/Logo"
import UserAvatar from "@/components/atoms/userAvatar"
import { useAuth } from "@/providers/AuthProvider"

const AiNavbar = () => {

    const { user } = useAuth()

    return (
        <>
            <header className="w-full">
                <div className="flex w-full max-w-7xl mx-auto items-center justify-between h-14 border-b px-4 md:px-0">
                    <div className="flex w-fit">
                        <Logo link />
                    </div>
                    <div className="flex w-fit">
                        <UserAvatar
                            alt={user ? user.user_metadata
                                ?.name : "John Doe"}
                            unoptimized={false}
                            priority
                            rounded="rounded-full"
                            className={"size-10"}
                        />
                    </div>
                </div>
            </header>
        </>
    )
}

export default AiNavbar
