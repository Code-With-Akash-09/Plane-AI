"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const geminiAI = async (body) => {
    let resp = await fetch(`${baseUrl}/api/gemini`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    resp = await resp.json()
    return resp
}