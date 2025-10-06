import { listContacts } from "@/lib/db"
import AdminContactsTable from "./table"

export const dynamic = "force-dynamic"

export default async function ContactsAdminPage() {
  // Gọi hàm chung, tự động dùng SQLite hoặc Postgres tùy môi trường
  const rows = await listContacts(200)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Danh sách tư vấn</h1>
      <AdminContactsTable initialRows={rows} />

      <p className="mt-3 text-xs text-slate-500">
        {process.env.DATABASE_URL
          ? "Nguồn: PostgreSQL (Supabase)"
          : "Nguồn: SQLite ./data.db"}
      </p>
    </div>
  )
}
