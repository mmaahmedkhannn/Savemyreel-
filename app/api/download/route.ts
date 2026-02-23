import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServiceForUrl } from "@/lib/services";
import { rateLimit } from "@/lib/rate-limit";

const requestSchema = z.object({
    url: z.string().url(),
});

export async function POST(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const { success } = rateLimit(ip);

    if (!success) {
        return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
        );
    }

    try {
        const body = await req.json();
        const result = requestSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid URL provided" }, { status: 400 });
        }

        const { url } = result.data;
        const service = getServiceForUrl(url);

        if (!service) {
            return NextResponse.json(
                { error: "Unsupported platform or invalid URL." },
                { status: 400 }
            );
        }

        const downloadData = await service.extract(url);
        return NextResponse.json(downloadData);

    } catch (error: any) {
        console.error("Download Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to process download request." },
            { status: 500 }
        );
    }
}
