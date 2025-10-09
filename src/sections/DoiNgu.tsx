"use client"
import Image from "next/image"

const TEAM = [
  {
    name: "Cộng sự A",
    role: "Founder",
    desc: "Phân tích crypto, xây cộng đồng, chia sẻ kiến thức.",
  },
  {
    name: "Cộng sự B",
    role: "Research",
    desc: "Nghiên cứu dự án, cập nhật thị trường và phân tích dữ liệu on-chain.",
  },
  {
    name: "Cộng sự C",
    role: "Tech",
    desc: "Phát triển bot, công cụ tracking dữ liệu on-chain.",
  },
  {
    name: "Cộng sự D",
    role: "Tech",
    desc: "Xây dựng hệ thống tự động hóa và hỗ trợ sản phẩm AI.",
  },
  
]

export default function DoiNgu() {
  return (
    <section id="doi-ngu" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-white mb-10">Đội ngũ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map((member, i) => (
            <div
              key={i}
              className="group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 p-6 shadow-md hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-semibold text-lg">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{member.name}</h3>
                  <p className="text-amber-400 text-sm">{member.role}</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
