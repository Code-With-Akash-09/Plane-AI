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

export const hfTextToImage = async (body) => {
    let resp = await fetch(`${baseUrl}/api/hugging-face/text-to-image`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    resp = await resp.json()
    return resp
}