import cloudinary from "@/lib/cloudinary/client";
import { openAI } from "@/lib/openai/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { prompt } = await request.json();
    try {
        const completion = await openAI.chat.completions.create({
            model: "google/gemini-2.5-flash-image-preview",
            messages: [
                { role: "user", content: prompt }
            ],
            modalities: ["image", "text"],
        })
        const images = completion.choices[0].message?.images || []
        const imageUrl = images[0]?.image_url?.url || null

        let uploadedImageUrl
        if (imageUrl) {
            const resp = await cloudinary.uploader.upload(imageUrl, {
                resource_type: "image",
                folder: "PlaneAI/images"
            })
            uploadedImageUrl = cloudinary.url(resp.public_id, {
                resource_type: "image",
                transformation: [
                    { quality: "auto", fetch_format: "auto" },
                    { width: 1200, crop: "thumb", gravity: "auto" },
                ],
            })
        }

        return NextResponse.json(
            { imageUrl: uploadedImageUrl },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: error.code }
        );
    }
}