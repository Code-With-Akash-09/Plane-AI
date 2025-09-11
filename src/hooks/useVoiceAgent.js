"use client"

import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

export const useVoiceAgent = () => {
    const lang = "en-US"
    const onMessage = false
    const [listening, setListening] = useState(false)
    const [partial, setPartial] = useState(false)
    const [transcript, setTranscript] = useState("")
    const recognitionRef = useRef(null)
    const forceStopRef = useRef(false)

    const isIOS = typeof window !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent)

    const startListening = () => {
        if (isIOS) {
            toast.warning("Voice input is not supported on iOS")
            return
        }
        if (recognitionRef.current && !listening) {
            forceStopRef.current = false
            recognitionRef.current.start()
            setListening(true)
            setPartial(false)
            setTranscript("")
        }
    }

    const stopListening = () => {
        if (!isIOS && recognitionRef.current && listening) {
            forceStopRef.current = true
            recognitionRef.current.stop()
        }
    }

    const speak = (text, onEndCallback) => {

        if (typeof window === "undefined") return

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = lang
        utterance.onend = () => {
            if (onEndCallback) onEndCallback()
            if (listening && !forceStopRef.current) recognitionRef.current?.start()
        }
        window.speechSynthesis.speak(utterance)
    }

    useEffect(() => {
        if (typeof window === "undefined" || isIOS) return

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) {
            toast.warning("Speech recognition is not supported on this device")
            return
        }

        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = lang

        recognition.onresult = (event) => {
            let interim = ""
            let finalText = ""

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) finalText += event.results[i][0].transcript
                else interim += event.results[i][0].transcript
            }

            if (interim) setPartial(interim)
            if (finalText) {
                setTranscript(finalText)
                setPartial("")
                if (onMessage) onMessage(finalText.trim())
            }
        }

        recognition.onerror = (err) => {
            if (err.error === "no-speech" && !forceStopRef.current) {
                recognition.stop()
                recognition.start()
                return
            }
            if (err.error === "aborted") return
            toast.error("Speech recognition error: " + err.error)
            setListening(false)
        }

        recognition.onend = () => {
            if (!forceStopRef.current && listening) recognition.start()
            else setListening(false)
        }

        recognitionRef.current = recognition
    }, [lang, onMessage, isIOS, listening])

    return {
        partial,
        transcript,
        listening,
        startListening,
        stopListening,
        speak,
        isIOS,
    }
}