import { fal } from "@fal-ai/client";
import { NextResponse } from "next/server";

fal.config({
    credentials: process.env.FAL_KEY,
})

export async function POST(request) {
    try {
        const { prompt } = await request.json();

        const result = await fal.run("fal-ai/flux/dev", {
            input: {
                prompt: prompt,
                seed: 6252023,
                image_size: "landscape_4_3",
                num_images: 4,
            },
        });

        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
