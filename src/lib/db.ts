// src/lib/db.ts
import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

const dbFile = process.env.DATABASE_URL || './data.db'
const abs = path.isAbsolute(dbFile) ? dbFile : path.join(process.cwd(), dbFile)

if (!fs.existsSync(abs)) fs.writeFileSync(abs, '')

export const db = new Database(abs)
db.pragma('journal_mode = WAL')

// tạo bảng (nếu chưa có)
db.exec(`
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`)

// nếu DB cũ thiếu cột phone → thêm
try {
  const cols = db.prepare(`PRAGMA table_info(contacts)`).all() as { name: string }[]
  const hasPhone = cols.some(c => c.name === 'phone')
  if (!hasPhone) {
    db.exec(`ALTER TABLE contacts ADD COLUMN phone TEXT;`)
  }
} catch {}
