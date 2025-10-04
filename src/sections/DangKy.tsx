"use client"

import { useEffect, useMemo, useState } from "react"

import Link from "next/link"

type ApiExchange = { key: string; name: string; url: string | null }

// Card cố định để dễ kiểm soát layout & logo
const CARDS = [
  {
    key: "binance",
    name: "Binance",
    logo: "/exchanges/binance.png", // bạn đã để trong public/exchanges
    desc: "Phí cạnh tranh, thanh khoản cao, hệ sinh thái rộng.",
  },
  {
    key: "bybit",
    name: "Bybit",
    logo: "/exchanges/bybit.png",
    desc: "Giao dịch phái sinh thân thiện, nhiều ưu đãi.",
  },
] as const

export default function DangKy() {
  const [links, setLinks] = useState<Record<string, string | null>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        // LƯU Ý: route hiện tại của bạn là /links (theo ảnh thư mục)
        const res = await fetch("/links", { cache: "no-store" })
        if (!res.ok) throw new Error("Không tải được link ref")
        const data = (await res.json()) as { exchanges?: ApiExchange[] }
        const map: Record<string, string | null> = {}
        for (const ex of data.exchanges ?? []) {
          map[ex.key] = ex.url ?? null
        }
        setLinks(map)
      } catch (e: any) {
        setError(e.message || "Lỗi không xác định")
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  // Chuẩn bị dữ liệu hiển thị (merge card cố định + url từ API)
  const cards = useMemo(
    () =>
      CARDS.map((c) => ({
        ...c,
        url: links[c.key] ?? null,
        guideHref: `/huong-dan/${c.key}`,
      })),
    [links]
  )

  return (
    <section id="dang-ky" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
      <h2 className="text-2xl font-bold">Đăng ký</h2>
      <p className="mt-3 max-w-3xl text-slate-300">
        Chọn sàn bạn muốn mở tài khoản. Hiện đang có 2 đối tác chính <strong>Binance</strong> và{" "}
        <strong>Bybit</strong>.
      </p>

      {loading && <p className="mt-4 text-slate-400">Đang tải link…</p>}
      {error && <p className="mt-4 text-red-400">{error}</p>}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.key}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={card.logo}
                alt={`${card.name} Logo`}
                className="h-10 w-10"
              />
              <div>
                <h3 className="text-lg font-semibold">{card.name}</h3>
                <p className="text-sm text-slate-400">{card.desc}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {/* Nút Đăng ký */}
              <a
                href={card.url ?? "#"}
                target={card.url ? "_blank" : undefined}
                rel={card.url ? "noopener noreferrer" : undefined}
                className={`rounded-xl px-4 py-2 font-semibold text-slate-950 transition
                  ${
                    card.url
                      ? "bg-amber-500 hover:bg-amber-400"
                      : "cursor-not-allowed bg-slate-700 text-slate-300"
                  }`}
              >
                {card.url ? "Đăng ký" : "Chưa có link"}
              </a>

              <Link
  href={`/huongdan/${card.key}`}
  className="rounded-xl border border-white/15 px-4 py-2 font-semibold text-slate-100 hover:bg-white/5 transition"
>
  Hướng dẫn
</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
