export async function GET() {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/Profiles`, {
            method: "GET",
            headers: {
                apikey: process.env.SUPABASE_ANON_KEY,
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
            }
        });

        return Response.json({ ok: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
