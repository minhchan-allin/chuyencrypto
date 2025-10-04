import type { Guide, Section } from "@/types/guide"

function Video({ video }: { video?: Section["video"] }) {
  if (!video) return null
  if (video.type === "youtube") {
    return (
      <div className="mt-4 aspect-video overflow-hidden rounded-xl border border-white/10">
        <iframe className="h-full w-full" src={video.src} title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      </div>
    )
  }
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
      <video controls className="w-full">
        <source src={video.src} />
      </video>
      {video.note && <p className="mt-2 text-xs text-slate-400">{video.note}</p>}
    </div>
  )
}

function SectionBlock({ s }: { s: Section }) {
  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900/50 p-6">
      <h2 className="text-xl font-bold">{s.heading}</h2>
      <ol className="mt-4 space-y-3">
        {s.steps.map((st, i) => (
          <li key={i} className="rounded-xl border border-white/10 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-7 w-7 flex-shrink-0 rounded-full bg-amber-500 text-center font-bold text-slate-950">{i + 1}</div>
              <div>
                <p className="font-semibold">{st.title}</p>
                <p className="text-sm text-slate-300">{st.desc}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <Video video={s.video} />
    </section>
  )
}

async function getGuide(san: string): Promise<Guide | null> {
  const key = san.toLowerCase()
  try {
    if (key === "binance") {
      const mod = await import("@/data/guides/binance")
      return mod.default
    }
    if (key === "bybit") {
      const mod = await import("@/data/guides/bybit")
      return mod.default
    }
    return null
  } catch {
    return null
  }
}

export default function Page({ params }: { params: { san: string } }) {
  const title =
    params.san === "binance" ? "Hướng dẫn Binance" :
    params.san === "bybit"   ? "Hướng dẫn Bybit"   :
    `Hướng dẫn ${params.san}`

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <a href="/" className="text-sm text-slate-400 hover:text-slate-200">← Về trang chủ</a>
      <h1 className="mt-3 text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-slate-300">Nội dung hướng dẫn sẽ đặt ở đây.</p>
    </div>
  )
}


