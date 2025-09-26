import { GoogleGenAI } from "@google/genai"
import { GoogleGenerativeAI } from "@google/generative-ai"

export const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
)

export const genImageAI = new GoogleGenAI(
    process.env.GEMINI_API_KEY
)