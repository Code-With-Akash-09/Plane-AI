"use client"

import { geminiAI } from '@/actions/gemini.js'
import Loading from '@/components/atoms/loading'
import Logo from '@/components/atoms/Logo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { questionPrompt } from '@/constant/agents/agents'
import { createClient } from '@/lib/supabase/client'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import InterviewScreen from './InterviewScreen'

const InterviewHomeScreen = ({ interviewId }) => {

    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState(null)
    const [interview, setInterview] = useState(null)
    const [startInterview, setStartInterview] = useState(false)
    const supabase = createClient()

    const getInterview = async (interviewId) => {
        const { data: Interview } = await supabase
            .from("Interviews")
            .select("*")
            .eq("interview_id", interviewId)
            .single()
        setInterview(Interview)
    }

    const generateQuestionsList = async () => {
        setLoading(true)

        const prompt = questionPrompt(interview)
        const body = { prompt: prompt }
        let { content } = await geminiAI(body)

        content = content.replace("```json", "").replace("```", "")
        setQuestions(JSON.parse(content)?.interviewQuestions)
        setLoading(false)
    }

    const updateQuestions = async () => {
        const { data, error } = await supabase
            .from('Interviews')
            .update({
                question_list: questions.map(q => ({
                    id: q.id,
                    question: q.question,
                    userAnswer: "",
                    correctAnswer: "",
                    rate: null,
                    feedback: "",
                    improvement: "",
                })),
                status: "in-progress"
            })
            .eq("interview_id", interview?.interview_id)
            .select()
            .single()

        if (error) {
            toast.error(error.message)
        }
        setInterview(data)
        setStartInterview(true)
    }

    useEffect(() => {
        getInterview(interviewId)
    }, [interviewId])

    useEffect(() => {
        if (questions) {
            updateQuestions()
        } else if (interview?.status === "in-progress") {
            setStartInterview(true)
            setInterview(interview)
        }
    }, [questions, interview])

    return (
        <>
            {
                !startInterview ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 flex-col gap-6 w-full h-fit">
                        <div className="flex flex-col w-full gap-6 md:gap-8 lg:gap-10">
                            <div className="flex w-full max-w-40 md:max-w-sm lg:max-w-md mx-auto relative aspect-square border border-neutral-700 rounded-2xl bg-gradient-to-r from-blue-800/40 via-neutral-900 to-purple-600/30">
                                <video loading={"lazy"} autoPlay muted loop playsInline className="w-full h-full relative rounded-2xl">
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
                                    {interview?.role}
                                </h1>
                                <span className="text-sm">
                                    Difficulty Level : <Badge>{interview?.difficulty}</Badge>
                                </span>
                                <div className="flex gap-4 items-center w-fit">
                                    <span className="text-sm">Skills:</span>
                                    <ul className="flex flex-wrap w-fit gap-2">
                                        {
                                            interview?.skills.map((skill, i) => (
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
                                disabled={loading}
                                onClick={generateQuestionsList}
                                className={"cursor-pointer"}
                            >
                                {
                                    loading ? "Generating Questions..." : "Start Interview"
                                }
                                {loading ? <Loading /> : <ArrowRight />}
                            </Button>
                        </div>
                    </div>
                ) : <InterviewScreen interview={interview} />
            }
        </>
    )
}

export default InterviewHomeScreen
