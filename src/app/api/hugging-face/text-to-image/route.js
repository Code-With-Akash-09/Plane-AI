import cloudinary from "@/lib/cloudinary/client";
import huggingFaceAPI from "@/lib/huggingFace/client";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { prompt } = await request.json();

        const result = await huggingFaceAPI.textToImage({
            provider: "auto",
            model: "black-forest-labs/FLUX.1-dev",
            inputs: prompt,
            parameters: {
                num_inference_steps: 30,
                guidance_scale: 8.5,
                width: 768,
                height: 768,
            },
        });

        const buffer = Buffer.from(await result.arrayBuffer());
        const base64 = buffer.toString("base64");
        const imageUrl = `data:image/jpeg;base64,${base64}`;

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
            { error: error.message },
            { status: error.code }
        );
    }
}