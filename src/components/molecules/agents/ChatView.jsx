"use client"

import Loading from "@/components/atoms/loading"
import UserAvatar from "@/components/atoms/userAvatar"
import { Mic, Volume2 } from "lucide-react"
import { useEffect, useRef } from "react"
import GeminiMarkdown from "./GeminiMarkdown"

const ChatView = ({
    name,
    role,
    index,
    question,
    answer,
    conversation,
    aiSpecking,
    isRecording,
    analyze
}) => {
    const chatEndRef = useRef(null)

    const renderContent = (content) => {
        if (!content) return <p className="italic text-neutral-500">N/A</p>;

        if (typeof content === 'string') {
            return <GeminiMarkdown content={content} />;
        }

        return content;
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [conversation])

    return (
        <div className="flex flex-col gap-2 md:gap-4 w-full p-4 border rounded-2xl lg:col-span-2 xl:col-span-3 bg-gradient-to-r from-blue-800/10 via-neutral-900 to-purple-600/10 overflow-y-auto max-h-[calc(100vh-430px)] md:max-h-[calc(100vh-200px)]">
            <div className="flex items-end gap-2 md:gap-4 w-full">
                <UserAvatar
                    alt={"AI"}
                    unoptimized={false}
                    priority
                    rounded="rounded-full"
                    className={"size-6 md:size-8"}
                />
                <p className="text-white max-w-4/5 text-sm p-4 rounded-md bg-white/20">
                    Hello {name}! Welcome to your interview for the role of {role}. I'm here to help you prepare for your interview. Let's get started!
                </p>
            </div>
            {conversation?.map((item, i) => (
                <div key={i} className="flex flex-col gap-2 md:gap-4">
                    <div className="flex items-end gap-2 md:gap-4 w-full">
                        <UserAvatar
                            alt={"AI"}
                            unoptimized={false}
                            priority
                            rounded="rounded-full"
                            className={"size-6 md:size-8"}
                        />
                        <div className="flex flex-col gap-2 text-white max-w-4/5 p-4 rounded-md bg-white/20">
                            <span className="text-sm font-semibold text-neutral-300">Question {i + 1}</span>
                            <p className="text-sm">
                                {item.question}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-end gap-2 md:gap-4 w-full justify-end">
                        <div className="flex flex-col gap-2 text-white max-w-4/5 p-4 rounded-md bg-purple-800/30 border border-purple-500">
                            <span className="text-sm font-semibold text-neutral-300"> Answer</span>
                            <p className="text-sm">
                                {item.userAnswer}
                            </p>
                        </div>
                        <UserAvatar
                            alt={name}
                            unoptimized={false}
                            priority
                            rounded="rounded-full"
                            className={"size-6 md:size-8"}
                        />
                    </div>
                    <div className="flex items-end gap-2 md:gap-4 w-full">
                        <UserAvatar
                            alt={"AI"}
                            unoptimized={false}
                            priority
                            rounded="rounded-full"
                            className={"size-6 md:size-8"}
                        />
                        <div className="flex flex-col gap-2 text-white max-w-4/5 p-4 rounded-md bg-white/20">
                            <span className="text-sm font-semibold text-neutral-300">AI Response</span>
                            <div className="flex flex-col text-sm space-y-4 w-full">
                                <div className="w-fit">
                                    <b className="text-blue-300">Correct Answer:</b>{renderContent(item.correctAnswer)}
                                </div>
                                <p>
                                    <b className="text-blue-300">Rating:</b> {item.rate}/5
                                </p>
                                <p>
                                    <b className="text-blue-300">Feedback:</b> {item.feedback}
                                </p>
                                <p>
                                    <b className="text-blue-300">Improvement:</b> {item.improvement}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex items-end gap-2 md:gap-4 w-full">
                <UserAvatar
                    alt={"AI"}
                    unoptimized={false}
                    priority
                    rounded="rounded-full"
                    className={"size-6 md:size-8"}
                />
                <div className="flex flex-col gap-2 text-white max-w-4/5 text-sm p-4 rounded-md bg-white/20">
                    <span className="text-sm font-semibold text-neutral-300">Question {index + 1}</span>
                    <p className="text-sm">
                        {question}
                    </p>
                </div>
            </div>
            <div className="flex w-full items-center justify-center">
                {aiSpecking && (
                    <div className="flex w-fit gap-1 text-emerald-400 text-xs animate-pulse">
                        <Volume2 size={16} />
                        <span>AI is speaking...</span>
                    </div>
                )}
                {isRecording && (
                    <div className="flex w-fit gap-1 text-red-400 text-xs animate-pulse">
                        <Mic size={16} />
                        <span>Recording User Answer...</span>
                    </div>
                )}
                {analyze && (
                    <div className="flex w-fit gap-1 text-purple-400 text-xs animate-pulse">
                        <Loading className="size-4" />
                        <span>Wait for moment ai is analyzing your answer...</span>
                    </div>
                )}
            </div>
            <div ref={chatEndRef} />
        </div>
    )
}

export default ChatView
