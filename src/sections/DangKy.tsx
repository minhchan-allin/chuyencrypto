"use client"
import { useEffect, useState } from "react"

type Exchange = { key: string; name: string; url: string | null }

export default function DangKy() {
  const [exchanges, setExchanges] = useState<Exchange[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/links")
      .then((res) => res.json())
      .then((data) => setExchanges(data.exchanges || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="dang-ky" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
      <h2 className="text-2xl font-bold">Đăng ký</h2>
      <p className="mt-3 max-w-3xl text-slate-300">
        Chọn sàn bạn muốn mở tài khoản. Hiện có Binance và Bybit.
      </p>

      {loading && <p className="mt-4 text-slate-400">Đang tải...</p>}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {exchanges.map((ex) => (
          <div
            key={ex.key}
            className="rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-semibold">{ex.name}</h3>
            <a
              href={ex.url ?? "#"}
              target={ex.url ? "_blank" : undefined}
              rel="noreferrer"
              className="mt-4 inline-block rounded-xl bg-cyan-500 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-400"
            >
              Đăng ký qua link ref
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
