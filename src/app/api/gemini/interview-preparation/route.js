import { genAI } from "@/lib/gemini/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { prompt } = await request.json();

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent({
            contents: [
                { role: "user", parts: [{ text: prompt }] }
            ]
        });

        return NextResponse.json(
            { content: result.response.text() },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: error.code }
        );
    }
}