import OpenAI from "openai";

export const openAI = new OpenAI({
    baseURL: process.env.OPENROUTER_API_BASE_URL,
    apiKey: process.env.OPENROUTER_API_KEY,
});