import Header from "@/components/Header"
import ThongTin from "@/sections/ThongTin"
import DangKy from "@/sections/DangKy"
import DoiNgu from "@/sections/DoiNgu"
import TuVan from "@/sections/TuVan"


export default function Page() {
  return (
    <div id="top">
      <Header />

      <section className="mx-auto max-w-6xl px-4 pt-28 pb-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
          <h1 className="text-3xl font-extrabold md:text-4xl">Chuyện Crypto</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Cộng đồng đăng ký sàn qua link ref, học hỏi – chia sẻ – nhận ưu đãi.
            Bắt đầu với Binance & Bybit.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#dang-ky"
              className="rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Đăng ký ngay
            </a>
            <a
              href="#thong-tin"
              className="rounded-xl border border-white/10 px-4 py-3 font-semibold text-slate-200 hover:bg-white/5"
            >
              Tìm hiểu thêm
            </a>
          </div>
        </div>
      </section>

      <ThongTin />
      <DangKy />
      <DoiNgu />
      <TuVan />

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-400">
          © {new Date().getFullYear()} Chuyện Crypto
        </div>
      </footer>
    </div>
  )
}
