import UserAvatar from "@/components/atoms/userAvatar"
import { Ripple } from "@/components/magicui/ripple"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/AuthProvider"
import { MessageCircle, Mic, PhoneCall } from "lucide-react"

const InterviewScreen = ({ interview }) => {

    const { user } = useAuth()

    return (
        <>
            <div className="flex flex-col w-full gap-4 h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full flex-grow">
                    <div
                        className="flex flex-col w-full gap-10 h-full items-center justify-center border rounded-2xl relative"
                    >
                        <div
                            className="flex z-10 w-full h-fit max-w-40 mx-auto aspect-square border border-neutral-800 rounded-full backdrop-blur-sm bg-gradient-to-r from-blue-800/40 via-neutral-900 to-purple-600/30">
                            <video
                                muted
                                loop
                                className="w-full h-fit relative rounded-full object-contain"
                            >
                                <source src="/assets/video/AI-Modal-1.webm" type="video/webm" />
                            </video>
                        </div>
                        <Ripple />
                    </div>
                    <div
                        className="flex flex-col w-full gap-6 h-full items-center justify-center border rounded-2xl relative bg-white/10 backdrop-blur-sm"
                    >
                        <div
                            className="flex z-10 w-full h-fit max-w-40 mx-auto aspect-square border border-neutral-800 rounded-full">
                            <UserAvatar
                                alt={user ? user.user_metadata
                                    ?.name : "John Doe"}
                                unoptimized={false}
                                priority
                                rounded="rounded-full"
                                className={"size-full"}
                            />
                        </div>
                        <span className="text-base md:text-lg font-bold font-mono">
                            {user ? user.user_metadata?.name : "John Doe"}
                        </span>
                    </div>
                </div>
                <div className="flex w-full h-fit flex-grow-0">
                    <div className="flex w-fit max-w-2xl backdrop-blur-sm bg-white/10 mx-auto border border-neutral-800 rounded-full items-center py-2.5 px-4 gap-3 justify-center">
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            className={"rounded-full"}
                        >
                            <Mic />
                        </Button>
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            className={"rounded-full"}
                        >
                            <MessageCircle />
                        </Button>
                        <Button
                            variant={"destructive"}
                            className={"rounded-full"}
                        >
                            <PhoneCall />
                            End Interview
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InterviewScreen
