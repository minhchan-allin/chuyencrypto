// src/app/admin/api/contacts/[id]/route.ts
import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id)
  console.log("[API:DELETE] id =", id)

  if (!id) {
    console.log("[API:DELETE] missing id")
    return NextResponse.json({ ok: false, error: "missing id" }, { status: 400 })
  }

  try {
    const info = db.prepare("DELETE FROM contacts WHERE id = ?").run(id)
    console.log("[API:DELETE] changes =", info.changes)
    return NextResponse.json({ ok: info.changes > 0, changes: info.changes })
  } catch (e: any) {
    console.error("[API:DELETE] error", e)
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
