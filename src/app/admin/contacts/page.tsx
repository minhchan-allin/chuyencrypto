import { db } from "@/lib/db"
import AdminContactsTable from "./table" // 👈 client component bên dưới

export const dynamic = "force-dynamic"

export default function ContactsAdminPage() {
  const rows = db.prepare(
    "SELECT id, name, email, phone, message, created_at FROM contacts ORDER BY id DESC LIMIT 500"
  ).all()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Danh sách tư vấn</h1>
      <AdminContactsTable initialRows={rows} />
      <p className="mt-3 text-xs text-slate-500">Nguồn: SQLite ./data.db</p>
    </div>
  )
}
