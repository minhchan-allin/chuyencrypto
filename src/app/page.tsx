import Image from "next/image"
import Header from "@/components/Header"
import ThongTin from "@/sections/ThongTin"
import DangKy from "@/sections/DangKy"
import DoiNgu from "@/sections/DoiNgu"
import TuVan from "@/sections/TuVan"

/** --- HERO (không default export) --- */
function HeroBlock() {
  return (
    <section className="relative pt-12">
      <div className="mx-auto max-w-6xl px-1 py-16">
        <div className="flex items-center justify-between rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 px-8 py-12">
          {/* Trái: tiêu đề + nút */}
          <div>
            <h1 className="text-3xl font-bold text-white">Chuyện Crypto</h1>
            <p className="mt-2 text-slate-300">
              Cộng đồng giao lưu kiến thức, học hỏi – chia sẻ – thị trường Crypto.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#dang-ky"
                className="rounded-lg bg-amber-500 px-5 py-3 font-semibold text-slate-950 hover:bg-amber-400 transition"
              >
                Tham gia Trade
              </a>
              <a
                href="https://zalo.me/g/ghxxre803"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                Tham gia cộng đồng
              </a>
            </div>
          </div>

          {/* Phải: LOGO */}
          <div className="hidden md:block">
            <Image
              src="/logo.png"             // đặt file trong /public/logo.png
              alt="Chuyện Crypto Logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/** --- TRANG CHỦ (chỉ 1 default export) --- */
export default function Page() {
  return (
    <>
      <Header />
      <main id="top">
        <HeroBlock />
        <ThongTin />
        <DangKy />
        <DoiNgu />
        <TuVan />
      </main>
    </>
  )
}
