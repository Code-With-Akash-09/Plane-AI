import Logo from "@/components/atoms/Logo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const InterviewId = async ({ params }) => {

    const { interviewId } = await params
    const supabase = await createClient()

    let { data: Interview } = await supabase
        .from("Interviews")
        .select("*")
        .eq("interview_id", interviewId)
        .single()

    return (
        <>
            <div className="flex-1 px-4 py-4 w-full overflow-y-auto">
                <div className="flex w-full flex-col max-w-7xl mx-auto h-full gap-4 md:gap-6">

                    <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 h-full md:items-center md:justify-center w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 flex-col gap-6 w-full h-fit">
                            <div className="flex flex-col w-full gap-6 md:gap-8 lg:gap-10">
                                <div className="flex w-full max-w-40 md:max-w-sm mx-auto relative aspect-square border border-neutral-700 rounded-2xl bg-gradient-to-r from-blue-800/40 via-neutral-900 to-purple-600/30">
                                    <Image
                                        src={"/assets/banner-img/cyborg.avif"}
                                        alt="Cyborg"
                                        fill
                                        className="object-contain h-4/5 object-bottom rounded-2xl"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full gap-6 md:gap-8 lg:gap-10">
                                <Logo
                                    sparkles
                                    aurora
                                    className={"md:text-4xl"}
                                />
                                <div className="flex flex-col gap-4 items-center justify-center w-fit">
                                    <h1 className="font-mono text-2xl md:text-3xl lg:text-4xl text-center font-semibold">
                                        {Interview.role}
                                    </h1>
                                    <span className="text-sm">
                                        Difficulty Level : <Badge>{Interview.difficulty}</Badge>
                                    </span>
                                    <div className="flex gap-4 items-center w-fit">
                                        <span className="text-sm">Skills:</span>
                                        <ul className="flex flex-wrap w-fit gap-2">
                                            {
                                                Interview.skills.map((skill, i) => (
                                                    <li
                                                        key={i}
                                                        className="px-4 py-1 rounded-2xl bg-white/20 backdrop-blur-sm text-white text-xs border border-primary"
                                                    >
                                                        {skill}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <Button>
                                    Start Interview
                                    <ArrowRight />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default InterviewId
