// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
// Nếu bạn KHÔNG bật alias '@', dùng đường dẫn tương đối:
import { db } from '../../../lib/db'
// Nếu bạn đã có alias '@/*' trong tsconfig, có thể dùng:
// import { db } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({})) as any
  const name = String(body?.name || '').trim()
  const email = String(body?.email || '').trim()
  const message = String(body?.message || '').trim()

  const errors: string[] = []
  if (!name) errors.push('name')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email')
  if (message.length > 1000) errors.push('message')

  if (errors.length) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  const stmt = db.prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)')
  const info = stmt.run(name, email, message)

  return NextResponse.json({ ok: true, id: info.lastInsertRowid })
}
