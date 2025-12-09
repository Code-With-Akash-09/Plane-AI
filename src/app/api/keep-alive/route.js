export async function GET() {
    try {
        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/Profiles?select=id&limit=1`;

        const response = await fetch(url, {
            headers: {
                apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            cache: "no-store",
        });

        const data = await response.json();

        return Response.json({ ok: true, data });
    } catch (err) {
        return Response.json({ ok: false, error: err.message });
    }
}
