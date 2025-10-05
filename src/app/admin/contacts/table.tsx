"use client"
import { useState} from "react"
import { useRouter } from "next/navigation"

type Row = {
  id: number
  name: string
  email: string
  phone?: string | null
  message?: string | null
  created_at: string // SQLite UTC 'YYYY-MM-DD HH:mm:ss'
}

function formatVN(utcStr: string) {
  const d = new Date(utcStr.replace(" ", "T") + "Z") // coi created_at là UTC
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).format(d)
}

export default function AdminContactsTable({ initialRows }: { initialRows: Row[] }) {
  const [rows, setRows] = useState<Row[]>(initialRows)
  const router = useRouter()

  async function handleDelete(id: number) {
    if (!confirm(`Xóa bản ghi #${id}?`)) return

    try {
      const res = await fetch(`/admin/api/contacts/${id}`, { method: "DELETE" })
      const text = await res.text()
      const data = (() => {
        try { return JSON.parse(text) as { ok: boolean; changes?: number; error?: string } }
        catch { return { ok: false as const, error: "invalid json" } }
      })()

      if (!res.ok || !data.ok) {
        alert(`Xóa thất bại: ${data.error ?? res.status}`)
        return
      }

    setRows((r) => r.filter((x) => x.id !== id))
    router.refresh()
  } catch (e: unknown) {
    console.error("[UI] DELETE error", e)
    alert("Lỗi mạng khi gọi API xoá")
  }
}


  const hasData = rows.length > 0

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
      <table className="min-w-[980px] w-full text-sm">
        <thead className="bg-white/5">
          <tr>
            <th className="px-3 py-2 text-left">ID</th>
            <th className="px-3 py-2 text-left">Tên</th>
            <th className="px-3 py-2 text-left">Email</th>
            <th className="px-3 py-2 text-left">SĐT</th>
            <th className="px-3 py-2 text-left">Nội dung</th>
            <th className="px-3 py-2 text-left">Thời gian (UTC+7)</th>
            <th className="px-3 py-2 text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {hasData ? rows.map((r) => (
            <tr key={r.id} className="border-t border-white/10 align-top">
              <td className="px-3 py-2">{r.id}</td>
              <td className="px-3 py-2">{r.name}</td>
              <td className="px-3 py-2">{r.email}</td>
              <td className="px-3 py-2">{r.phone || "-"}</td>
              <td className="px-3 py-2 whitespace-pre-line">{r.message}</td>
              <td className="px-3 py-2">{formatVN(r.created_at)}</td>
              <td className="px-3 py-2">
                <button
                  onClick={() => handleDelete(r.id)}
                  className="rounded-md bg-red-500 px-3 py-1 font-medium text-white hover:bg-red-400"
                >
                  Xóa
                </button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan={7} className="px-3 py-6 text-center text-slate-400">Chưa có dữ liệu</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
