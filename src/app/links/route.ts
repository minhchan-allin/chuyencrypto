import { NextResponse } from "next/server";

export async function GET() {
  const { REF_BINANCE, REF_BYBIT } = process.env;
  return NextResponse.json({
    exchanges: [
      { key: "binance", name: "Binance", url: REF_BINANCE || null },
      { key: "bybit",   name: "Bybit",   url: REF_BYBIT   || null },
    ],
  });
}
