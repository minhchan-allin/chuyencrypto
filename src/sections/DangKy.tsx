import Image from "next/image"
import Link from "next/link"

type ExchangeCard = {
  key: "binance" | "bybit" | string
  name: string
  logoSrc: string
  registerHref: string
}

const cards: ExchangeCard[] = [
  {
    key: "binance",
    name: "Binance",
    logoSrc: "/exchanges/binance.png",
    registerHref: process.env.REF_BINANCE ?? "#",
  },
  {
    key: "bybit",
    name: "Bybit",
    logoSrc: "/exchanges/bybit.png",
    registerHref: process.env.REF_BYBIT ?? "#",
  },
]

export default function DangKy() {
  return (
    <section id="dang-ky" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-bold">Đăng ký sàn</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {cards.map(card => (
          <div key={card.key} className="rounded-2xl border border-white/10 p-6">
            <div className="flex items-center gap-3">
              <Image src={card.logoSrc} alt={card.name} width={40} height={40} />
              <h3 className="text-lg font-semibold">{card.name}</h3>
            </div>

            <div className="mt-4 flex gap-3">
              <a
                href={card.registerHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-amber-500 px-4 py-2 font-semibold text-slate-950 hover:bg-amber-400"
              >
                Đăng ký
              </a>

              <Link
                href={`/huongdan/${card.key}`}
                className="rounded-xl border border-white/15 px-4 py-2 font-semibold text-slate-100 hover:bg-white/5"
              >
                Hướng dẫn
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
