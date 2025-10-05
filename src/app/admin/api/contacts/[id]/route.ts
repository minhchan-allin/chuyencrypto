import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const numId = Number(id)
  if (!numId) {
    return NextResponse.json({ ok: false, error: "missing id" }, { status: 400 })
  }

  try {
    const info = db.prepare("DELETE FROM contacts WHERE id = ?").run(numId)
    return NextResponse.json({ ok: info.changes > 0, changes: info.changes })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown error"
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
