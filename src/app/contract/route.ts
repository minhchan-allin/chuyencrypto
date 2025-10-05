import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { isValidVNMobileE164, isValidVNMobileLocal, normalizePhoneVN } from "@/lib/phone"

type ContactBody = {
  name?: string
  email?: string
  phone?: string
  message?: string
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as ContactBody

  const name = String(body?.name ?? "").trim()
  const email = String(body?.email ?? "").trim()
  let   phone = String(body?.phone ?? "").trim()
  const message = String(body?.message ?? "").trim()

  const errors: string[] = []
  if (!name) errors.push("name")
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("email")
  if (!phone) errors.push("phone")

  const local = phone.replace(/[\s.\-()]/g, "")
  const e164 = normalizePhoneVN(local)
  if (!(isValidVNMobileLocal(local) || isValidVNMobileE164(e164))) {
    errors.push("phone_format")
  } else {
    phone = e164
  }
  if (message.length > 1000) errors.push("message_len")

  if (errors.length) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  const info = db.prepare(
    "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)"
  ).run(name, email, phone, message)

  return NextResponse.json({ ok: true, id: info.lastInsertRowid })
}

export async function GET() {
  const rows = db.prepare(
    "SELECT id, name, email, phone, message, created_at FROM contacts ORDER BY id DESC LIMIT 200"
  ).all()
  return NextResponse.json({ ok: true, rows })
}
