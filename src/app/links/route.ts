// src/app/links/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const { REF_BINANCE, REF_BYBIT } = process.env;

  // Debug xem ENV đã nạp chưa (xem trong terminal đang chạy `npm run dev`)
  console.log("[ENV]", { REF_BINANCE, REF_BYBIT });

  return NextResponse.json({
    exchanges: [
      { key: "binance", name: "Binance", url: REF_BINANCE ?? null },
      { key: "bybit",   name: "Bybit",   url: REF_BYBIT   ?? null },
    ],
  });
}
