// src/lib/db.ts
import "server-only"

// Nếu có DATABASE_URL -> dùng Postgres, ngược lại SQLite local
const USE_PG = !!process.env.DATABASE_URL

/* ================== Postgres (prod) ================== */
let pgPool: import("pg").Pool | null = null
async function getPg() {
  if (!pgPool) {
    const { Pool } = await import("pg")
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // Supabase/Neon thường yêu cầu
    })
  }
  return pgPool!
}

/* ================== SQLite (dev) ================== */
type BetterSqlite3 = typeof import("better-sqlite3")
type SqliteDatabase = import("better-sqlite3").Database

let sqliteDb: SqliteDatabase | null = null
async function getSqlite() {
  if (!sqliteDb) {
    const Better: BetterSqlite3 = (await import("better-sqlite3")).default as unknown as BetterSqlite3
    const path = await import("node:path")
    const fs = await import("node:fs")

    const dataDir = path.join(process.cwd(), "data")
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)
    const file = path.join(dataDir, "data.db")

    sqliteDb = new (Better as any)(file) as SqliteDatabase
    sqliteDb
      .prepare(
        `create table if not exists contacts (
           id integer primary key autoincrement,
           name text not null,
           email text not null,
           phone text,
           message text,
           created_at text default (datetime('now'))
         )`,
      )
      .run()
  }
  return sqliteDb!
}

/* ================== API chung ================== */
export type ContactRow = {
  id: number
  name: string
  email: string
  phone: string | null
  message: string | null
  created_at: string // ISO string
}

export async function insertContact(name: string, email: string, phone: string, message: string) {
  if (USE_PG) {
    const pg = await getPg()
    await pg.query(
      "insert into contacts (name,email,phone,message) values ($1,$2,$3,$4)",
      [name, email, phone, message]
    )
    return
  }
  const db = await getSqlite()
  db.prepare("insert into contacts (name,email,phone,message) values (?,?,?,?)").run(
    name, email, phone, message
  )
}

export async function listContacts(limit = 200): Promise<ContactRow[]> {
  if (USE_PG) {
    const pg = await getPg()
    const res = await pg.query(
      "select id, name, email, phone, message, created_at from contacts order by id desc limit $1",
      [limit]
    )
    type PgRow = {
      id: string | number
      name: string
      email: string
      phone: string | null
      message: string | null
      created_at: string | Date
    }
    const rows = res.rows as PgRow[]
    return rows.map((r) => ({
      id: Number(r.id),
      name: r.name,
      email: r.email,
      phone: r.phone ?? null,
      message: r.message ?? null,
      created_at: new Date(r.created_at).toISOString(),
    }))
  }

  const db = await getSqlite()
  type SqlRow = {
    id: number
    name: string
    email: string
    phone: string | null
    message: string | null
    created_at: string
  }
  const rows = db
    .prepare(
      "select id, name, email, phone, message, created_at from contacts order by id desc limit ?"
    )
    .all(limit) as SqlRow[]

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    message: r.message,
    created_at: typeof r.created_at === "string" ? r.created_at : new Date().toISOString(),
  }))
}

export async function deleteContact(id: number) {
  if (USE_PG) {
    const pg = await getPg()
    const res = await pg.query("delete from contacts where id = $1", [id])
    return { changes: res.rowCount ?? 0 }
  }
  const db = await getSqlite()
  const info = db.prepare("delete from contacts where id = ?").run(id)
  return { changes: info.changes }
}
