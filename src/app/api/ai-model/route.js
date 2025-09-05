import { QuestionPrompt } from "@/constant/agents/agents";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
    const body = await request.json();
    const context = QuestionPrompt(body)

    try {
        const openai = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: 'openai/gpt-oss-20b:free',
            messages: [
                {
                    role: 'user',
                    content: context,
                },
            ],
        });
        return NextResponse.json(completion.choices[0].message);
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: error.code }
        );
    }
}