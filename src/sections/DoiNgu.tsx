const members = [
  { name: "Cộng sự A", role: "Founder", bio: "Phân tích crypto, xây cộng đồng, chia sẻ kiến thức." },
  { name: "Cộng sự B", role: "Research", bio: "Nghiên cứu dự án, cập nhật thị trường." },
  { name: "Cộng sự C", role: "Tech", bio: "Phát triển bot, công cụ tracking dữ liệu on-chain." },
  { name: "Cộng sự D", role: "Tech", bio: "Phát triển bot, công cụ tracking dữ liệu on-chain." },
]

export default function DoiNgu() {
  return (
    <section id="doi-ngu" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-18">
      <h2 className="text-2xl font-bold">Đội ngũ</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {members.map((m) => (
          <div key={m.name} className="rounded-2xl border border-white/10 p-5">
            <h3 className="mt-3 text-lg font-semibold">{m.name}</h3>
            <p className="text-sm text-cyan-200">{m.role}</p>
            <p className="mt-2 text-sm text-slate-400">{m.bio}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
