"use client"

import BackBtn from "@/components/atoms/BackBtn"
import Logo from "@/components/atoms/Logo"
import UserAvatar from "@/components/atoms/userAvatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/providers/AuthProvider"
import { LogOut } from "lucide-react"
import { toast } from "sonner"

const AiNavbar = () => {

    const { user, signOut } = useAuth()

    const handleSignOut = async () => {
        const { error } = await signOut()
        if (error) {
            toast.error(error.message)
        }
        toast.success("Logged out successfully!")
    }

    return (
        <>
            <header className="w-full">
                <div className="flex w-full max-w-7xl mx-auto items-center justify-between h-14 border-b px-4 md:px-0">
                    <div className="flex gap-2 md:gap-4 w-fit">
                        <BackBtn />
                        <Logo link />
                    </div>
                    <div className="flex w-fit">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="rounded-full">
                                <div
                                    className={"flex items-center gap-4 justify-start"}
                                >
                                    <UserAvatar
                                        alt={user ? user.user_metadata
                                            ?.name : "John Doe"}
                                        unoptimized={false}
                                        priority
                                        rounded="rounded-full"
                                        className={"size-10"}
                                    />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className={"min-w-40"}>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Button
                                            variant="custom"
                                            className={"h-[unset] w-full"}
                                            onClick={handleSignOut}
                                        >
                                            Log Out
                                            <DropdownMenuShortcut>
                                                <LogOut />
                                            </DropdownMenuShortcut>
                                        </Button>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
        </>
    )
}

export default AiNavbar
