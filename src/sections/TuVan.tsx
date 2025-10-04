"use client"
import { useState } from "react"
import { isValidVNMobileLocal, normalizePhoneVN, isValidVNMobileE164 } from "@/lib/phone"

export default function TuVan() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [phoneErr, setPhoneErr] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle")

  function validatePhone(p: string) {
    const local = p.replace(/[\s.\-()]/g, "")
    const e164 = normalizePhoneVN(local)
    if (isValidVNMobileLocal(local) || isValidVNMobileE164(e164)) {
      setPhoneErr(null)
      return e164
    }
    setPhoneErr("Số điện thoại VN không hợp lệ (ví dụ: 0901234567 hoặc +84901234567).")
    return null
  }

  async function onSubmit() {
    setStatus("sending")

    const e164 = validatePhone(phone)
    if (!e164) { setStatus("error"); return }

    try {
      const res = await fetch("/contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: e164, message }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error()
      setStatus("ok")
      setName(""); setEmail(""); setPhone(""); setMessage("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="tu-van" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
      <h2 className="text-2xl font-bold">Tư vấn</h2>
      <div className="mt-6 grid gap-4 sm:max-w-xl">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Họ và tên"
          className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3" />
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email"
          className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3" />
        <div>
          <input
            value={phone}
            onChange={e=>setPhone(e.target.value)}
            onBlur={()=>validatePhone(phone)}
            placeholder="Số điện thoại"
            inputMode="tel"
            maxLength={16}
            className={`rounded-xl border px-4 py-3 bg-slate-900/60 ${
              phoneErr ? "border-red-500" : "border-white/10"
            }`}
          />
          {phoneErr && <p className="mt-1 text-sm text-red-400">{phoneErr}</p>}
        </div>
        <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Nội dung tư vấn"
          className="min-h-[120px] rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3" />
        <button onClick={onSubmit} disabled={status==="sending"}
          className="rounded-xl bg-amber-500 px-4 py-3 font-semibold text-slate-950 hover:bg-amber-400 disabled:opacity-60">
          {status==="sending" ? "Đang gửi..." : "Gửi yêu cầu"}
        </button>
        {status==="ok" && <p className="text-sm text-emerald-400">Đã gửi thành công!</p>}
        {status==="error" && <p className="text-sm text-red-400">Có lỗi, vui lòng kiểm tra thông tin.</p>}
      </div>
    </section>
  )
}
