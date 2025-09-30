"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const geminiInterviewPreparationAI = async (body) => {
    let resp = await fetch(`${baseUrl}/api/gemini/interview-preparation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    resp = await resp.json()
    return resp
}

export const geminiTextToImageAI = async (body) => {
    let resp = await fetch(`${baseUrl}/api/gemini/text-to-image`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    resp = await resp.json()
    return resp
}

export const falTextToImageAI = async (body) => {
    let resp = await fetch(`${baseUrl}/api/gemini/text-to-image`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    resp = await resp.json()
    return resp
}

export const openAITextToImage = async (body) => {
    let resp = await fetch(`${baseUrl}/api/ai-model/text-to-image`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    resp = await resp.json()
    return resp
}

export const getOpenRouterCredits = async () => {
    let resp = await fetch("https://openrouter.ai/api/v1/credits",
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
            }
        });
    resp = await resp.json();
    return resp
}