"use client"

import { geminiInterviewPreparationAI } from "@/actions/gemini";
import Loading from "@/components/atoms/loading";
import UserAvatar from "@/components/atoms/userAvatar";
import { Ripple } from "@/components/magicui/ripple";
import ChatView from "@/components/molecules/agents/ChatView";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { answerFeedbackPrompt, greetingMessage } from "@/constant/agents/agents";
import { useIsMobile } from "@/hooks/use-mobile";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import { InfoIcon, MessageCircle, Mic, MicOff, PhoneCall } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";

const StartInterview = () => {

    const supabase = createClient()
    const { user } = useAuth()
    const isMobile = useIsMobile()
    const { interviewId } = useParams()
    const [interviewDetails, setInterviewDetails] = useState(null)
    const [aiSpecking, setAiSpeaking] = useState(false)
    const [analyze, setAnalyze] = useState(false)
    const [index, setIndex] = useState(0)
    const [userAnswer, setUserAnswer] = useState("")
    const [conversation, setConversation] = useState([])
    const [isInterviewComplete, setIsInterviewComplete] = useState(false)
    const currentRecordingRef = useRef("")
    const recordingStartTimeRef = useRef(null)
    const [chatEnabled, setChatEnabled] = useState(false)
    const router = useRouter()

    const {
        error,
        isRecording,
        results,
        interimResult,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    const question = useMemo(() => {
        if (!interviewDetails?.question_list) return null;
        return interviewDetails.question_list[index]?.question || null;
    }, [interviewDetails, index]);

    const speak = (text, cb) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = "en-IN";
            speech.rate = 1;
            speech.pitch = 1;
            speech.volume = 1;

            speech.onstart = () => setAiSpeaking(true)
            speech.onend = () => {
                setAiSpeaking(false)
                if (cb) cb();
            }
            speech.onerror = (err) => {
                setAiSpeaking(false)
                console.log(err)
            };
            window.speechSynthesis.speak(speech);
        }
    };

    const greeting = () => {
        const greetMsg = greetingMessage(user, interviewDetails)
        speak(greetMsg, () => {
            if (question) {
                setTimeout(() => {
                    speak(question);
                }, 1000);
            }
        });
    }

    const getInterviewDetails = async (interviewId) => {
        const { data: Interview, error } = await supabase
            .from("Interviews")
            .select("*")
            .eq("interview_id", interviewId)
            .single()

        setInterviewDetails(Interview)

        if (error) {
            setInterviewDetails(null)
            router.replace(`/agents/interview-preparation/interview/${interviewId}`)
        }
    }

    const moveToNextQuestion = () => {
        const nextIndex = index + 1;
        if (nextIndex < interviewDetails.question_list.length) {
            speak("Previous question answered submit. Let's move to next question.");
            setTimeout(() => {
                setIndex(nextIndex);
                speak(interviewDetails.question_list[nextIndex].question);
            }, 2000);
        } else {
            speak("That was the last question. Great job!");
            setIsInterviewComplete(true)
        }
    }

    const handleAnswerSubmit = async (answerText = userAnswer) => {
        if (!answerText.trim()) {
            toast.error("Please provide an answer before submitting");
            return;
        }

        setAnalyze(true)
        const data = {
            question: question,
            answer: answerText
        }

        const prompt = answerFeedbackPrompt(data)
        const body = { prompt: prompt }
        let { content } = await geminiInterviewPreparationAI(body)

        if (content) {
            content = content.replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            const match = content.match(/\{[\s\S]*\}/);
            if (!match) throw new Error("No JSON found in AI response");

            const feedback = JSON.parse(match[0]);

            const updatedAnswer = {
                id: index,
                question: question,
                userAnswer: feedback.userAnswer,
                correctAnswer: feedback.correctAnswer,
                rate: feedback.rate,
                feedback: feedback.feedback,
                improvement: feedback.improvement
            }

            setConversation(prev => [...prev, updatedAnswer])
            setAnalyze(false)
            setUserAnswer("")
            currentRecordingRef.current = ""
            moveToNextQuestion();
        }
        setAnalyze(false)
    }

    const updateAnswerToDB = async () => {
        try {
            if (conversation.length === 0) {
                toast.warning("No answer to save")
                return false
            }

            const { error } = await supabase
                .from("Interviews")
                .update({
                    question_list: conversation,
                    status: "completed"
                })
                .eq("interview_id", interviewId)
                .select()
                .single()

            if (error) {
                console.log(error.message)
                toast.error("Failed to save answer")
                return false
            }

            toast.success("Answer saved successfully")
            return true

        } catch (error) {
            toast.error("Failed to save interview. Please try again.");
            console.error("Save error:", error);
            return false;
        }
    }

    const handleEndInterview = async () => {
        const saved = await updateAnswerToDB();
        if (saved) {
            router.push(`/agents/interview-preparation/interview/${interviewId}/result`);
        }
    };

    const handleRecording = () => {
        if (isRecording) {
            stopSpeechToText()

            const currentAnswer = currentRecordingRef.current || userAnswer
            if (currentAnswer.trim()) {
                handleAnswerSubmit(currentAnswer)
            } else {
                toast.error("No speech detected. Please try again.");
            }
        } else {
            setUserAnswer("")
            currentRecordingRef.current = ""
            recordingStartTimeRef.current = Date.now()
            startSpeechToText()
        }
    }

    const handleEndCall = async () => {
        const { error } = await supabase
            .from("Interviews")
            .update({
                question_list: null,
                status: "not-started"
            })
            .eq("interview_id", interviewId)
            .select()
            .single()

        if (!error) {
            toast.success("Interview ended successfully")
            router.push(`/agents/interview-preparation/`)
        }
    }

    const toggleChatView = () => {
        setChatEnabled(prev => !prev)
    }

    useEffect(() => {
        if (interviewId) getInterviewDetails(interviewId);
    }, [interviewId]);

    useEffect(() => {
        if (interviewDetails?.question_list === null) {
            router.push(`/agents/interview-preparation/interview/${interviewId}`)
        }
    }, [interviewDetails]);

    useEffect(() => {
        if (user) greeting();
    }, [user, interviewDetails]);

    useEffect(() => {
        if (results && results.length > 0 && isRecording) {
            const currentSessionResults = results.filter(result =>
                recordingStartTimeRef.current &&
                result.timestamp >= recordingStartTimeRef.current
            );

            if (currentSessionResults.length > 0) {
                const latestResult = currentSessionResults[currentSessionResults.length - 1];
                if (latestResult && latestResult.transcript) {
                    const transcript = latestResult.transcript.trim();
                    setUserAnswer(transcript);
                    currentRecordingRef.current = transcript;
                }
            }
        }
    }, [results, isRecording])

    useEffect(() => {
        if (interimResult && isRecording) {
            currentRecordingRef.current = interimResult.trim();
        }
    }, [interimResult, isRecording])

    useEffect(() => {
        if (isInterviewComplete && conversation.length > 0) {
            handleEndInterview();
        }
    }, [isInterviewComplete, conversation]);

    return (
        <>
            <div className="flex-1 px-4 py-4 w-full">
                <div className="flex w-full max-w-7xl mx-auto h-full items-center justify-center">
                    <div className="flex flex-col w-full gap-4 h-full">
                        <div className="flex w-full h-fit flex-grow-0 items-center justify-center">
                            <div className="items-center flex gap-2 py-2.5 rounded-md px-4 bg-yellow-500/10 text-sm backdrop-blur-sm md:text-center">
                                <InfoIcon className="size-4" />
                                <span className="w-fit">
                                    Do not switch tabs or window otherwise it will start form the beginning
                                </span>
                            </div>
                        </div>
                        <div className={`flex relative flex-col ${chatEnabled ? "md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : " flex-col"} w-full flex-grow gap-4 md:gap-6`}>
                            <div
                                className={`grid ${chatEnabled ? "grid-cols-2 md:grid-cols-1" : "grid-cols-1 md:grid-cols-2 h-full"} gap-4 md:gap-6 w-full md:flex-grow relative`}>
                                <div
                                    className={`flex flex-col w-full gap-10 h-full items-center justify-center border rounded-2xl relative overflow-hidden ${chatEnabled && "aspect-square md:aspect-auto"}`}>
                                    <div
                                        className={`flex z-10 w-full h-fit max-w-20 md:max-w-40 mx-auto aspect-square border border-neutral-800
                        rounded-full backdrop-blur-sm bg-white
                        ${(isRecording || analyze) && "opacity-40"}`}
                                    >
                                        {/* <video muted playsInline className="w-full h-full relative rounded-full bg-transparent">
                                            <source src="/assets/banner-img/hero-img.avif" type="video/mp4" />
                                        </video> */}
                                        <Image
                                            src={"/assets/banner-img/hero-img.avif"}
                                            alt="Hero Image"
                                            fill
                                            className="object-contain object-bottom-right md:object-bottom rounded-full"
                                        />
                                    </div>
                                    {aiSpecking &&
                                        <Ripple
                                            mainCircleSize={isMobile ? 80 : 210} bgColor="bg-blue-500/70"
                                        />
                                    }
                                </div>
                                <div
                                    className={`flex flex-col w-full gap-6 h-full items-center justify-center border rounded-2xl relative bg-white/5 overflow-hidden ${chatEnabled && "aspect-square md:aspect-auto"}`}>
                                    <div className={`flex z-10 w-full h-fit max-w-20 md:max-w-40 mx-auto aspect-square border border-neutral-800
                        rounded-full ${(aiSpecking || analyze) && "opacity-40"}`}>
                                        <UserAvatar
                                            alt={user.user_metadata?.name}
                                            unoptimized={false}
                                            priority
                                            rounded="rounded-full"
                                            className={"size-full"}
                                        />
                                    </div>
                                    {isRecording &&
                                        <Ripple
                                            mainCircleSize={isMobile ? 80 : 210} bgColor="bg-primary/30"
                                        />
                                    }
                                </div>
                            </div>
                            {!chatEnabled && analyze && (
                                <div
                                    className="flex flex-col md:flex-row items-center w-fit absolute inset-0 my-auto mx-auto top-4 z-10 h-fit border border-neutral-800 px-4 py-2.5 gap-4 bg-white/20 backdrop-blur-sm rounded-md max-w-60 text-center md:max-w-fit">
                                    Wait for moment ai is analyzing your answer
                                    <Loading className="text-primary" />
                                </div>
                            )}
                            {chatEnabled &&
                                <ChatView
                                    name={user?.user_metadata?.name}
                                    role={interviewDetails?.role}
                                    index={index}
                                    question={question}
                                    answer={userAnswer}
                                    conversation={conversation}
                                    aiSpecking={aiSpecking}
                                    isRecording={isRecording}
                                    analyze={analyze}
                                />
                            }
                        </div>
                        <div className="flex w-full h-fit flex-grow-0">
                            <div
                                className="flex w-fit max-w-2xl backdrop-blur-sm bg-white/10 mx-auto border border-neutral-800 rounded-full items-center py-2.5 px-4 gap-3 justify-center">
                                <Button
                                    variant={chatEnabled ? "outline" : "default"}
                                    size={"icon"}
                                    className={"rounded-full cursor-pointer"}
                                    onClick={toggleChatView}
                                >
                                    <MessageCircle />
                                </Button>
                                <Button
                                    disabled={aiSpecking || analyze}
                                    variant={isRecording ? "outline" : "default"}
                                    className={"rounded-full"}
                                    onClick={handleRecording}
                                >
                                    {
                                        !isRecording ?
                                            <>
                                                <Mic />
                                                Start Recording
                                            </>
                                            :
                                            <>
                                                <MicOff />
                                                Stop Recording
                                            </>
                                    }
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant={"destructive"}
                                            className={"rounded-full"}
                                        >
                                            <PhoneCall />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be save your previously given questions answers. Are you sure you want to continue. you still have {interviewDetails?.question_list?.length - conversation?.length} questions to answer. if you are ok then click continue.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleEndCall}
                                            >
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default StartInterview
