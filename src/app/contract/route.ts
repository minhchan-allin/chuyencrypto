import { NextResponse } from "next/server"
import { isValidVNMobileE164, isValidVNMobileLocal, normalizePhoneVN } from "@/lib/phone"
import { insertContact, listContacts } from "@/lib/db"

type ContactBody = { name?: string; email?: string; phone?: string; message?: string }

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

  if (errors.length) return NextResponse.json({ ok: false, errors }, { status: 400 })

  await insertContact(name, email, phone, message)
  return NextResponse.json({ ok: true })
}

export async function GET() {
  const rows = await listContacts(200)
  return NextResponse.json({ ok: true, rows })
}
