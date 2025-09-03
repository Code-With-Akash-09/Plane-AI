"use client"

import Logo from '@/components/atoms/Logo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import InterviewScreen from './InterviewScreen'

const InterviewHomeScreen = ({ interview }) => {

    const [loading, setLoading] = useState(false)
    const [startInterview, setStartInterview] = useState(false)

    return (
        <>
            {
                !startInterview ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 flex-col gap-6 w-full h-fit">
                        <div className="flex flex-col w-full gap-6 md:gap-8 lg:gap-10">
                            <div className="flex w-full max-w-40 md:max-w-sm lg:max-w-md mx-auto relative aspect-square border border-neutral-700 rounded-2xl bg-gradient-to-r from-blue-800/40 via-neutral-900 to-purple-600/30">
                                <video autoPlay muted loop className="w-full h-full relative rounded-2xl">
                                    <source src="/assets/video/AI-Modal-2.mp4" type="video/mp4" />
                                </video>
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
                                    {interview.role}
                                </h1>
                                <span className="text-sm">
                                    Difficulty Level : <Badge>{interview.difficulty}</Badge>
                                </span>
                                <div className="flex gap-4 items-center w-fit">
                                    <span className="text-sm">Skills:</span>
                                    <ul className="flex flex-wrap w-fit gap-2">
                                        {
                                            interview.skills.map((skill, i) => (
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
                            <Button
                                onClick={() => setStartInterview(true)}
                                className={"cursor-pointer"}
                            >
                                Start Interview
                                <ArrowRight />
                            </Button>
                        </div>
                    </div>
                ) : <InterviewScreen />
            }
        </>
    )
}

export default InterviewHomeScreen
