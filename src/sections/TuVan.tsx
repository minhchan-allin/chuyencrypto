"use client"
import { useState } from "react"

export default function TuVan() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle")

  const onSubmit = async () => {
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error("Lỗi")
      setStatus("ok")
      setName("")
      setEmail("")
      setMessage("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="tu-van" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
      <h2 className="text-2xl font-bold">Tư vấn</h2>
      <div className="mt-6 grid gap-4 sm:max-w-xl">
        <input
          placeholder="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3"
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3"
        />
        <textarea
          placeholder="Nội dung tư vấn"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[120px] rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3"
        />
        <button
          onClick={onSubmit}
          disabled={status === "sending"}
          className="rounded-xl bg-amber-500 px-4 py-3 font-semibold text-slate-950 hover:bg-amber-400 disabled:opacity-60"
        >
          {status === "sending" ? "Đang gửi..." : "Gửi yêu cầu"}
        </button>
        {status === "ok" && (
          <p className="text-sm text-emerald-400">Đã gửi thành công!</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400">Có lỗi, thử lại.</p>
        )}
      </div>
    </section>
  )
}
