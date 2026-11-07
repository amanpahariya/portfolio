import { NextResponse } from "next/server";

// In-Memory Telemetry Rate Limiting (max 30 events / min / IP)
const telemetryRateLimitMap = new Map();
const MAX_RATE_LIMIT_ENTRIES = 1000;

function isTelemetryRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 30;

  if (telemetryRateLimitMap.size > MAX_RATE_LIMIT_ENTRIES) {
    for (const [key, val] of telemetryRateLimitMap.entries()) {
      if (now > val.resetTime) telemetryRateLimitMap.delete(key);
    }
    if (telemetryRateLimitMap.size > MAX_RATE_LIMIT_ENTRIES) telemetryRateLimitMap.clear();
  }

  const record = telemetryRateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    telemetryRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(req) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isTelemetryRateLimited(ip)) {
      return NextResponse.json({ success: false, rateLimited: true }, { status: 429 });
    }

    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("x-nf-geo") ||
      req.headers.get("cf-ipcountry") ||
      "Global";
    const referrer = String(req.headers.get("referer") || "Direct").slice(0, 200);
    const body = await req.json().catch(() => ({}));

    const event = String(body.event || "page_view").slice(0, 50);
    const metadata = typeof body.metadata === "object" && body.metadata !== null ? body.metadata : {};

    // Server-side telemetry log (readable in your hosting deployment logs)
    console.log(`[VISITOR_TELEMETRY] [${new Date().toISOString()}] Event:${event} Country:${country} IP:${ip} Referrer:${referrer}`, metadata);

    // Optional webhook trigger for phone alerts
    const webhookUrl = process.env.TELEMETRY_WEBHOOK_URL;
    if (webhookUrl && event === "page_view") {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `👁️ **New Portfolio Visitor!**\n**Country**: ${country}\n**Referrer**: ${referrer}`,
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, country });
  } catch {
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
